"use client";

import { useMemo, useSyncExternalStore } from "react";

export type TripDraft = {
  destinationSlug: string;
  city: string;
  country: string;
  basePrice?: number;
  days?: number;
  hotelName?: string;
  hotelPrice?: number;
  placeName?: string;
  plan?: string;
  planPrice?: number;
  travelers?: number;
  travelDate?: string;
  updatedAt: number;
};

const storageKey = "travellian-trip-draft-v1";
const draftEvent = "travellian:trip-draft-changed";
const subscribe = (callback: () => void) => {
  window.addEventListener(draftEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(draftEvent, callback);
    window.removeEventListener("storage", callback);
  };
};
const getSnapshot = () => localStorage.getItem(storageKey) ?? "";
const readDraft = (snapshot: string): TripDraft | null => {
  if (!snapshot) return null;
  try { return JSON.parse(snapshot) as TripDraft; } catch { return null; }
};
const notify = () => window.dispatchEvent(new Event(draftEvent));

export function updateTripDraft(update: Omit<Partial<TripDraft>, "updatedAt">) {
  const current = readDraft(getSnapshot());
  const sameDestination = !update.destinationSlug || update.destinationSlug === current?.destinationSlug;
  const next = { ...(sameDestination ? current : null), ...update, updatedAt: Date.now() } as TripDraft;
  localStorage.setItem(storageKey, JSON.stringify(next));
  notify();
  return next;
}

export function useTripDraft() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const draft = useMemo(() => readDraft(snapshot), [snapshot]);
  const clearDraft = () => { localStorage.removeItem(storageKey); notify(); };
  return { draft, clearDraft };
}
