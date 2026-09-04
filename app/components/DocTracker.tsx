"use client";

import React from "react";
import { Check, Circle } from "lucide-react";
import { useMounted, useProgress } from "../hooks/useProgress";

type Props = {
  route: string;
};

/** ডকের নিচের "পড়া শেষ" টগল — nav-এর ✓ আর হোমপেজের গণনা এখান থেকেই আসে। */
export default function DocTracker({ route }: Props) {
  const mounted = useMounted();
  const { isRead, toggleRead } = useProgress();
  const read = mounted && isRead(route);

  return (
    <div className="seam-t mt-10 flex items-center justify-between gap-4 pt-5">
      <p className="t-caption">
        পড়া শেষ করলে চিহ্নিত করুন — এটা শুধু আপনার এই ব্রাউজারে থাকে।
      </p>
      <button
        type="button"
        aria-pressed={read}
        onClick={() => toggleRead(route)}
        className={`control shrink-0 px-3.5 py-2 text-xs ${read ? "control--primary" : ""}`}
        suppressHydrationWarning
      >
        {read ? <Check size={13} /> : <Circle size={13} />}
        {read ? "পড়া হয়েছে" : "পড়া হয়নি"}
      </button>
    </div>
  );
}
