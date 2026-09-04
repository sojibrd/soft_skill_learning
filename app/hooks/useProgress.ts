"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Progress-এর একমাত্র মালিক। কোনো কম্পোনেন্ট সরাসরি `localStorage` ছোঁবে না —
 * সব পড়া-লেখা এখান দিয়ে, যাতে key-স্কিমা এক জায়গায় থাকে এবং static export-এ
 * hydration mismatch না ঘটে।
 *
 * Key স্কিমা (`v1` — কনটেন্ট বদলালে migrate করার জন্য):
 *   ssl:v1:read   → { [docRoute]: true }
 *   ssl:v1:drill  → { [`${docRoute}#${index}`]: true }
 */
const READ_KEY = "ssl:v1:read";
const DRILL_KEY = "ssl:v1:drill";

type Flags = Record<string, true>;

/**
 * Static export-এ প্রথম render সার্ভারে হয়, যেখানে `localStorage` নেই।
 * তাই mount-এর আগে কোনো progress UI দেখানো যাবে না — নইলে server ও client-এর
 * markup আলাদা হয়ে hydration ভাঙে।
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useProgress() {
  const [read, setRead] = useLocalStorage<Flags>(READ_KEY, {});
  const [drills, setDrills] = useLocalStorage<Flags>(DRILL_KEY, {});

  const isRead = useCallback((route: string) => read[route] === true, [read]);

  const toggleRead = useCallback(
    (route: string) =>
      setRead((prev) => {
        const next = { ...prev };
        if (next[route]) delete next[route];
        else next[route] = true;
        return next;
      }),
    [setRead],
  );

  const isDrillDone = useCallback(
    (route: string, index: number) => drills[`${route}#${index}`] === true,
    [drills],
  );

  const toggleDrill = useCallback(
    (route: string, index: number) =>
      setDrills((prev) => {
        const key = `${route}#${index}`;
        const next = { ...prev };
        if (next[key]) delete next[key];
        else next[key] = true;
        return next;
      }),
    [setDrills],
  );

  const drillsDoneIn = useCallback(
    (route: string, total: number) => {
      let done = 0;
      for (let i = 0; i < total; i++) if (drills[`${route}#${i}`]) done++;
      return done;
    },
    [drills],
  );

  const readCount = useCallback(
    (routes: string[]) => routes.reduce((sum, route) => sum + (read[route] ? 1 : 0), 0),
    [read],
  );

  const clearAll = useCallback(() => {
    setRead({});
    setDrills({});
  }, [setRead, setDrills]);

  return {
    isRead,
    toggleRead,
    isDrillDone,
    toggleDrill,
    drillsDoneIn,
    readCount,
    clearAll,
  };
}
