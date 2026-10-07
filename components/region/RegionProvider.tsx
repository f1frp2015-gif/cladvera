"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
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

function readStoredRegion(): Region | null {
  try {
    const stored = window.localStorage.getItem(REGION_STORAGE_KEY);
    return stored === "US" || stored === "CA" ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Holds the visitor's country choice. The inline script in app/layout.tsx
 * applies the stored choice to <html data-region> before first paint; this
 * provider keeps React state and storage in step after hydration.
 */
export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("US");

  useEffect(() => {
    const stored = readStoredRegion();
    if (stored) setRegionState(stored);
    else document.documentElement.dataset.region = "US";
  }, []);

  const setRegion = useCallback((next: Region) => {
    setRegionState(next);
    document.documentElement.dataset.region = next;
    try {
      window.localStorage.setItem(REGION_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the attribute still applies.
    }
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
