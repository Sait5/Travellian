import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!connectionString) throw new Error("Missing Postgres connection string");

const sql = postgres(connectionString, { ssl: "require", prepare: false, max: 1 });

await sql.unsafe(`
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default 'Traveler',
  role text not null default 'traveler' check (role in ('traveler', 'consultant')),
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  traveler_id uuid not null references auth.users(id) on delete cascade,
  subject text not null default 'Планирование путешествия',
  destination text,
  status text not null default 'open' check (status in ('open', 'waiting', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists conversations_traveler_id_idx on public.conversations(traveler_id);
create index if not exists conversations_updated_at_idx on public.conversations(updated_at desc);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email, 'Traveler'), '@', 1)),
    case when new.raw_app_meta_data->>'role' = 'consultant' then 'consultant' else 'traveler' end
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    role = excluded.role;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert or update of email, raw_user_meta_data, raw_app_meta_data
on auth.users for each row execute function public.handle_new_user();

create or replace function public.touch_conversation()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.conversations set updated_at = now(), status = case when status = 'closed' then 'open' else status end
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists on_message_created on public.messages;
create trigger on_message_created after insert on public.messages
for each row execute function public.touch_conversation();

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "profiles select own or consultant" on public.profiles;
create policy "profiles select own or consultant" on public.profiles for select to authenticated
using (id = auth.uid() or coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'consultant');

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update to authenticated
using (id = auth.uid()) with check (id = auth.uid() and role = 'traveler');

drop policy if exists "conversations select own or consultant" on public.conversations;
create policy "conversations select own or consultant" on public.conversations for select to authenticated
using (traveler_id = auth.uid() or coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'consultant');

drop policy if exists "travelers create conversations" on public.conversations;
create policy "travelers create conversations" on public.conversations for insert to authenticated
with check (traveler_id = auth.uid() and coalesce(auth.jwt()->'app_metadata'->>'role', '') <> 'consultant');

drop policy if exists "participants update conversations" on public.conversations;
create policy "participants update conversations" on public.conversations for update to authenticated
using (traveler_id = auth.uid() or coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'consultant')
with check (traveler_id = auth.uid() or coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'consultant');

drop policy if exists "participants read messages" on public.messages;
create policy "participants read messages" on public.messages for select to authenticated
using (exists (
  select 1 from public.conversations c where c.id = conversation_id
  and (c.traveler_id = auth.uid() or coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'consultant')
));

drop policy if exists "participants send messages" on public.messages;
create policy "participants send messages" on public.messages for insert to authenticated
with check (sender_id = auth.uid() and exists (
  select 1 from public.conversations c where c.id = conversation_id
  and (c.traveler_id = auth.uid() or coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'consultant')
));

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles, public.conversations, public.messages to authenticated;

do $$ begin
  alter publication supabase_realtime add table public.conversations;
exception when duplicate_object then null;
end $$;
do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null;
end $$;
`);

console.log("Supabase schema and RLS policies are ready.");
await sql.end();
