"use client";

import { CheckCircle2, Clock3, LoaderCircle, MessageCircle, Send, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";
import styles from "./TravelChat.module.scss";

type Conversation = {
  id: string; traveler_id: string; subject: string; destination: string | null;
  status: "open" | "waiting" | "closed"; created_at: string; updated_at: string;
  travelerName?: string; travelerEmail?: string;
};
type Message = { id: string; conversation_id: string; sender_id: string; body: string; created_at: string; read_at: string | null };
type Profile = { id: string; full_name: string; email: string };

export default function TravelChat({ consultantView = false }: { consultantView?: boolean }) {
  const { locale } = useLocale();
  const { traveler, loading: authLoading } = useAuth();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isConsultant = traveler?.role === "consultant";

  const loadConversations = useCallback(async () => {
    if (!traveler) return;
    setError("");
    if (isConsultant) {
      const { data, error: conversationError } = await supabase.from("conversations").select("*").order("updated_at", { ascending: false });
      if (conversationError) { setError(conversationError.message); setLoading(false); return; }
      const rows = (data ?? []) as Conversation[];
      const ids = [...new Set(rows.map((item) => item.traveler_id))];
      const { data: profiles } = ids.length ? await supabase.from("profiles").select("id,full_name,email").in("id", ids) : { data: [] };
      const profileMap = new Map(((profiles ?? []) as Profile[]).map((profile: Profile) => [profile.id, profile]));
      const enriched = rows.map((item) => ({ ...item, travelerName: profileMap.get(item.traveler_id)?.full_name, travelerEmail: profileMap.get(item.traveler_id)?.email }));
      setConversations(enriched);
      setSelectedId((current) => current && enriched.some((item) => item.id === current) ? current : enriched[0]?.id ?? null);
    } else {
      const { data: existing, error: findError } = await supabase.from("conversations").select("*").eq("traveler_id", traveler.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (findError) { setError(findError.message); setLoading(false); return; }
      let conversation = existing as Conversation | null;
      if (!conversation) {
        const { data: created, error: createError } = await supabase.from("conversations").insert({ traveler_id: traveler.id }).select().single();
        if (createError) { setError(createError.message); setLoading(false); return; }
        conversation = created as Conversation;
      }
      setConversations([conversation]);
      setSelectedId(conversation.id);
    }
    setLoading(false);
  }, [isConsultant, supabase, traveler]);

  useEffect(() => {
    if (!traveler) return;
    const task = window.setTimeout(() => void loadConversations(), 0);
    return () => window.clearTimeout(task);
  }, [loadConversations, traveler]);

  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    supabase.from("messages").select("*").eq("conversation_id", selectedId).order("created_at").then(({ data, error: messageError }: { data: unknown[] | null; error: { message: string } | null }) => {
      if (!active) return;
      if (messageError) setError(messageError.message);
      else setMessages((data ?? []) as Message[]);
    });
    const channel = supabase.channel(`conversation:${selectedId}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${selectedId}` }, (payload: { new: unknown }) => {
      const incoming = payload.new as Message;
      setMessages((current) => current.some((item) => item.id === incoming.id) ? current : [...current, incoming]);
    }).subscribe();
    return () => { active = false; void supabase.removeChannel(channel); };
  }, [selectedId, supabase]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!traveler || !selectedId || sending) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = String(formData.get("message") || "").trim();
    if (!body) return;
    setSending(true);
    const { data, error: sendError } = await supabase.from("messages").insert({ conversation_id: selectedId, sender_id: traveler.id, body }).select().single();
    setSending(false);
    if (sendError) { setError(sendError.message); return; }
    const sent = data as Message;
    setMessages((current) => current.some((item) => item.id === sent.id) ? current : [...current, sent]);
    form.reset();
    if (isConsultant) await supabase.from("conversations").update({ status: "waiting" }).eq("id", selectedId);
  }

  async function setStatus(status: Conversation["status"]) {
    if (!selectedId || !isConsultant) return;
    const { error: statusError } = await supabase.from("conversations").update({ status }).eq("id", selectedId);
    if (statusError) setError(statusError.message);
    else setConversations((current) => current.map((item) => item.id === selectedId ? { ...item, status } : item));
  }

  if (authLoading || (traveler && loading)) return <section className={styles.state}><LoaderCircle className={styles.spinner}/><p>{locale === "ru" ? "Подключаем защищённый чат…" : "Connecting your secure chat…"}</p></section>;
  if (!traveler) return <section className={styles.state}><MessageCircle/><h2>{locale === "ru" ? "Войдите, чтобы написать консультанту" : "Sign in to message a consultant"}</h2><p>{locale === "ru" ? "Переписка сохраняется в вашем профиле и доступна с любого устройства." : "Your conversation stays in your profile and is available on every device."}</p><button onClick={() => window.dispatchEvent(new Event("travellian:auth-required"))}>{locale === "ru" ? "Войти или зарегистрироваться" : "Sign in or create account"}</button></section>;
  if (consultantView && !isConsultant) return <section className={styles.state}><ShieldCheck/><h2>{locale === "ru" ? "Этот кабинет доступен консультанту" : "This desk is for consultants"}</h2><p>{locale === "ru" ? "Откройте обычный чат из меню профиля." : "Open the traveler chat from your profile menu."}</p></section>;

  const activeConversation = conversations.find((item) => item.id === selectedId);
  return <section className={styles.shell}>
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHead}><span>{isConsultant ? (locale === "ru" ? "ВХОДЯЩИЕ" : "INBOX") : (locale === "ru" ? "ВАШ КОНСУЛЬТАНТ" : "YOUR CONSULTANT")}</span><h2>{isConsultant ? (locale === "ru" ? "Диалоги" : "Conversations") : "Anna Petrova"}</h2><p>{isConsultant ? (locale === "ru" ? `${conversations.length} активных обращений` : `${conversations.length} active requests`) : (locale === "ru" ? "Тревел-дизайнер · обычно отвечает в течение часа" : "Travel designer · usually replies within an hour")}</p></div>
      <div className={styles.conversationList}>{conversations.length ? conversations.map((conversation) => <button key={conversation.id} className={conversation.id === selectedId ? styles.activeConversation : ""} onClick={() => { setMessages([]); setSelectedId(conversation.id); }}><span className={styles.avatar}><UserRound/></span><span><strong>{isConsultant ? conversation.travelerName || conversation.travelerEmail || "Traveler" : (locale === "ru" ? "Планирование поездки" : "Journey planning")}</strong><small>{conversation.destination || (locale === "ru" ? "Общий запрос" : "General request")}</small></span><i data-status={conversation.status}/></button>) : <p className={styles.empty}>{locale === "ru" ? "Новых обращений пока нет." : "No new requests yet."}</p>}</div>
      <div className={styles.secure}><ShieldCheck/><span><strong>{locale === "ru" ? "Приватная переписка" : "Private conversation"}</strong><small>{locale === "ru" ? "Доступ только у вас и команды Travellian" : "Only you and the Travellian team have access"}</small></span></div>
    </aside>
    <div className={styles.chat}>
      <header className={styles.chatHead}><div><span className={styles.online}/><div><strong>{isConsultant ? activeConversation?.travelerName || activeConversation?.travelerEmail || "Traveler" : "Anna Petrova"}</strong><small>{locale === "ru" ? "онлайн · Travellian" : "online · Travellian"}</small></div></div>{isConsultant && activeConversation && <select value={activeConversation.status} onChange={(event) => void setStatus(event.target.value as Conversation["status"])}><option value="open">{locale === "ru" ? "Открыт" : "Open"}</option><option value="waiting">{locale === "ru" ? "Ждём клиента" : "Waiting"}</option><option value="closed">{locale === "ru" ? "Закрыт" : "Closed"}</option></select>}</header>
      <div className={styles.messages} aria-live="polite">
        {!messages.length && activeConversation && <div className={styles.welcome}><Sparkles/><h3>{locale === "ru" ? "Начнём с вашей идеи" : "Let’s start with your idea"}</h3><p>{locale === "ru" ? "Расскажите, куда и когда хотите поехать. Консультант уточнит бюджет, темп и пожелания к отелю." : "Tell us where and when you want to travel. Your consultant will clarify budget, pace and hotel preferences."}</p></div>}
        {messages.map((message) => { const own = message.sender_id === traveler.id; return <article className={own ? styles.ownMessage : styles.otherMessage} key={message.id}><p>{message.body}</p><span>{new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date(message.created_at))}{own && <CheckCircle2/>}</span></article>; })}
        <div ref={endRef}/>
      </div>
      {activeConversation ? <form className={styles.composer} onSubmit={sendMessage}><textarea name="message" maxLength={2000} placeholder={isConsultant ? (locale === "ru" ? "Ответить путешественнику…" : "Reply to the traveler…") : (locale === "ru" ? "Напишите о будущей поездке…" : "Tell us about your next journey…")} required/><button type="submit" disabled={sending} aria-label={locale === "ru" ? "Отправить" : "Send"}>{sending ? <LoaderCircle className={styles.spinner}/> : <Send/>}</button></form> : <div className={styles.noConversation}><Clock3/>{locale === "ru" ? "Выберите диалог слева" : "Choose a conversation"}</div>}
      {error && <p className={styles.error} role="alert">{locale === "ru" ? "Ошибка чата: " : "Chat error: "}{error}</p>}
    </div>
  </section>;
}
