"use client";

import React from "react";
import { Check, Square } from "lucide-react";
import Markdown from "./Markdown";
import { slugify } from "../lib/slug";
import { useMounted, useProgress } from "../hooks/useProgress";

/** `content.ts`-এর `DRILL_HEADING` ও `extractHeadings()` একই লেখা ব্যবহার করে */
const DRILL_HEADING_TEXT = "অনুশীলন";

type Props = {
  route: string;
  drills: string[];
};

/**
 * `## অনুশীলন` সেকশন। প্রতিটি drill-এর পাশে একটা checkbox — এটাই সাইটের
 * আসল হিসাব: পড়া নয়, করা।
 */
export default function DrillList({ route, drills }: Props) {
  const mounted = useMounted();
  const { isDrillDone, toggleDrill, drillsDoneIn } = useProgress();

  if (drills.length === 0) return null;

  const done = mounted ? drillsDoneIn(route, drills.length) : 0;

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        {/* এই সেকশনটা Markdown-এর বাইরে রেন্ডার হয়, তাই anchor id হাতে বসাতে
            হয় — নইলে TOC-এর "অনুশীলন" লাইনটা কোথাও নামত না। */}
        <h2 id={slugify(DRILL_HEADING_TEXT)} className="t-title">
          {DRILL_HEADING_TEXT}
        </h2>
        <span className="t-caption" suppressHydrationWarning>
          {mounted ? `${done} / ${drills.length}` : `${drills.length}টি drill`}
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {drills.map((drill, index) => {
          const checked = mounted && isDrillDone(route, index);
          return (
            <li key={index}>
              <button
                type="button"
                aria-pressed={checked}
                onClick={() => toggleDrill(route, index)}
                className="surface-well flex w-full items-start gap-3 p-3 text-left"
              >
                <span className="mt-0.5 shrink-0" aria-hidden>
                  {checked ? <Check size={15} /> : <Square size={15} />}
                </span>
                <Markdown route={route} inline className="t-body min-w-0 text-sm">
                  {drill}
                </Markdown>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
