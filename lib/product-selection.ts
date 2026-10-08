"use client";
import { useSyncExternalStore } from "react";
import { parseProductIds } from "@/content/data/catalog";

const KEY = "cladvera.product-selection.v1";
const EVENT = "cladvera-selection";
let fallback = "";
function snapshot() {
  try { return window.localStorage.getItem(KEY) ?? fallback; } catch { return fallback; }
}
function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => { if (event.key === KEY || event.key === null) callback(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(EVENT, callback); };
}
export function setSelection(ids: string[]) {
  fallback = parseProductIds(ids.join(",")).join(",");
  try { window.localStorage.setItem(KEY, fallback); } catch { /* Memory fallback for restricted storage. */ }
  window.dispatchEvent(new Event(EVENT));
}
export function useSelection() {
  const stored = useSyncExternalStore(subscribe, snapshot, () => "");
  return { ids: parseProductIds(stored), setSelection };
}
