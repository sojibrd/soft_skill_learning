"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle, RotateCcw } from "lucide-react";
import ProgressReadout from "../components/ProgressReadout";
import { useMounted, useProgress } from "../hooks/useProgress";

export interface ProgressDoc {
  route: string;
  title: string;
  groupLabel: string;
  drillTotal: number;
}

type Filter = "all" | "unread" | "drills-left" | "drills-none" | "done";

export default function ProgressClient({ docs }: { docs: ProgressDoc[] }) {
  const mounted = useMounted();
  const { isRead, drillsDoneIn, clearAll } = useProgress();
  const [filter, setFilter] = useState<Filter>("all");

  /* সব হিসাব একবারে, একটা পাসে — প্রতিটা filter আলাদাভাবে গুনলে একই কাজ
     পাঁচবার হতো, আর সংখ্যাগুলো তালিকার সাথে মিলত না। */
  const rows = useMemo(
    () =>
      docs.map((doc) => {
        const read = mounted && isRead(doc.route);
        const drillsDone = mounted ? drillsDoneIn(doc.route, doc.drillTotal) : 0;
        return {
          ...doc,
          read,
          drillsDone,
          complete: read && drillsDone === doc.drillTotal,
        };
      }),
    [docs, mounted, isRead, drillsDoneIn],
  );

  const total = rows.length;
  const readCount = rows.filter((row) => row.read).length;
  const percent = total > 0 ? Math.round((readCount / total) * 100) : 0;

  const totalDrills = rows.reduce((sum, row) => sum + row.drillTotal, 0);
  const doneDrills = rows.reduce((sum, row) => sum + row.drillsDone, 0);

  /* "drill বাকি" ফিল্টারটাই এই পাতার আসল কারণ: সাইটের পুরো যুক্তি হলো
     পড়া ≠ পারা, আর এই একটা ফিল্টার ঠিক সেই ফাঁকটা দেখায়। */
  const matches = (row: (typeof rows)[number], id: Filter) => {
    if (id === "unread") return !row.read;
    if (id === "drills-left") return row.read && row.drillsDone < row.drillTotal;
    if (id === "drills-none") return row.drillTotal > 0 && row.drillsDone === 0;
    if (id === "done") return row.complete;
    return true;
  };

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "সব অধ্যায়" },
    { id: "unread", label: "পড়া হয়নি" },
    { id: "drills-left", label: "drill বাকি" },
    { id: "drills-none", label: "drill শুরুই হয়নি" },
    { id: "done", label: "সম্পূর্ণ" },
  ];

  const visible = rows.filter((row) => matches(row, filter));

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 md:px-10 md:py-12">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="t-title text-xl md:text-2xl">অগ্রগতি</h1>
          <p className="t-caption mt-1">
            সব হিসাব শুধু এই ব্রাউজারে থাকে — কোথাও পাঠানো হয় না।
          </p>
        </div>
        <button
          type="button"
          onClick={clearAll}
          className="control control--quiet shrink-0 px-2.5 py-1.5 text-xs"
        >
          <RotateCcw size={12} />
          সব মুছুন
        </button>
      </div>

      <section className="surface-panel mt-6 p-4 md:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="t-caption">পড়া অধ্যায়</span>
              <span className="t-mono t-accent text-xs" suppressHydrationWarning>
                {readCount}/{total} ({percent}%)
              </span>
            </div>
            <div className="mt-1.5">
              <ProgressReadout percent={percent} label="পড়া অধ্যায়ের অনুপাত" className="h-2 w-full" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="t-caption">সম্পন্ন অনুশীলন</span>
              <span className="t-mono t-accent text-xs" suppressHydrationWarning>
                {doneDrills}/{totalDrills}
              </span>
            </div>
            <div className="mt-1.5">
              <ProgressReadout
                percent={totalDrills > 0 ? Math.round((doneDrills / totalDrills) * 100) : 0}
                label="সম্পন্ন অনুশীলনের অনুপাত"
                className="h-2 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="segment-group mt-6 flex flex-wrap">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className="segment px-3 py-2 text-xs"
          >
            {item.label}
            <span className="t-mono ml-1.5 text-[10px]" suppressHydrationWarning>
              {rows.filter((row) => matches(row, item.id)).length}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="surface-panel t-caption mt-6 p-12 text-center">
          এই ফিল্টারে কোনো অধ্যায় নেই।
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-1.5">
          {visible.map((row) => (
            <li key={row.route}>
              <Link
                href={row.route}
                className="row flex items-center gap-3 px-3 py-2.5 text-xs"
              >
                <span className="shrink-0" aria-hidden suppressHydrationWarning>
                  {row.read ? <Check size={13} /> : <Circle size={13} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{row.title}</span>
                  <span className="t-caption block truncate">{row.groupLabel}</span>
                </span>
                {row.drillTotal > 0 && (
                  <span
                    className={`chip shrink-0 ${row.complete ? "chip--ok" : ""}`}
                    suppressHydrationWarning
                  >
                    {row.drillsDone}/{row.drillTotal}
                  </span>
                )}
                <ArrowRight size={13} className="shrink-0" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
