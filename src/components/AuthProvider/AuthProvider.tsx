"use client";

import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";

export type Traveler = { id: string; name: string; email: string; role: "traveler" | "consultant" };
type AuthResult = { error?: string; needsConfirmation?: boolean };
type AuthContextValue = {
  traveler: Traveler | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mapUser(user: User | null): Traveler | null {
  if (!user?.email) return null;
  return {
    id: user.id,
    email: user.email,
    name: String(user.user_metadata?.full_name || user.email.split("@")[0]),
    role: user.app_metadata?.role === "consultant" ? "consultant" : "traveler",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [traveler, setTraveler] = useState<Traveler | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      if (!active) return;
      const profile = mapUser(data.user);
      setTraveler(profile);
      if (profile) localStorage.setItem("travellian-user", JSON.stringify(profile));
      else localStorage.removeItem("travellian-user");
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      const profile = mapUser(session?.user ?? null);
      setTraveler(profile);
      if (profile) localStorage.setItem("travellian-user", JSON.stringify(profile));
      else localStorage.removeItem("travellian-user");
      setLoading(false);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [supabase]);

  const value: AuthContextValue = {
    traveler,
    loading,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { error: error.message } : {};
    },
    signUp: async (name, email, password) => {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) return { error: error.message };
      return { needsConfirmation: !data.session };
    },
    signOut: async () => { await supabase.auth.signOut(); },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
