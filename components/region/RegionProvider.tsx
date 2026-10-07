"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { Region } from "@/content/data/regions";

export const REGION_STORAGE_KEY = "cladvera_region";

interface RegionContextValue {
  region: Region;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextValue>({
  region: "US",
  setRegion: () => undefined,
});

// The source of truth is <html data-region>, set before hydration by the
// inline bootstrap script and updated by setRegion. React reads it as an
// external store so no state is copied inside an effect.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Region {
  return document.documentElement.dataset.region === "CA" ? "CA" : "US";
}

function getServerSnapshot(): Region {
  return "US";
}

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const region = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setRegion = useCallback((next: Region) => {
    document.documentElement.dataset.region = next;
    try {
      window.localStorage.setItem(REGION_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the attribute still applies.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return <RegionContext.Provider value={{ region, setRegion }}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  return useContext(RegionContext);
}

/** Inline bootstrap: applies the stored region before hydration to avoid a flash. */
export const regionBootstrapScript = `(function(){try{var r=localStorage.getItem(${JSON.stringify(
  REGION_STORAGE_KEY,
)});document.documentElement.dataset.region=(r==="CA"?"CA":"US");}catch(e){document.documentElement.dataset.region="US";}})();`;
