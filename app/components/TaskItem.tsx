"use client";

import Link from "next/link";
import type { Task } from "../lib/plan";
import { todayISO, toBnDigits } from "../lib/dates";
import Markdown from "./Markdown";
import PrincipleChips from "./PrincipleChips";
import { useMounted, useProgress } from "../hooks/useProgress";

/**
 * একটা কাজ: নেটিভ checkbox (`.check`), টিক দিলে লেখা কাটা, কবে শেষ হলো তার তারিখ,
 * আর মিনিট / ⚑ / 🔁 / 🧠 chip।
 *
 * কাজে `(ডক ০৩.০১)` থাকলে এই সাইটের ঐ অধ্যায়ের পাতার লিংক। drill-এর খাতার লাইন
 * এখানে নয় — খাতা আর ফোনের রেকর্ড সাইটের বাইরে থাকে।
 *
 * `from` দিলে কাজটা অন্য দিনের — হোমের জমে থাকা মাইলফলকে দিনের লিংক দেখায়।
 */
export default function TaskItem({ task, from }: { task: Task; from?: { code: string; label: string } }) {
  const mounted = useMounted();
  const { isTaskDone, taskDoneDate, toggleTask } = useProgress();

  const checked = mounted && isTaskDone(task.id);
  const doneOn = checked ? taskDoneDate(task.id) : null;
  const doneToday = doneOn !== null && doneOn === todayISO();

  return (
    <li data-done={checked} className="surface-raised flex items-start gap-3 p-3 sm:p-4">
      {/* checkbox লেখার বাইরে — কাজের লেখায় লিংক থাকতে পারে, আর label-এর ভেতরে লিংক রাখা যায় না */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleTask(task.id, todayISO())}
        aria-label={checked ? "সম্পন্ন — চিহ্ন তুলে দিন" : "সম্পন্ন হিসেবে চিহ্নিত করুন"}
        className="check mt-0.5"
      />

      <div className="min-w-0 flex-1">
        <Markdown inline className="task-text text-sm">
          {task.text}
        </Markdown>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {task.minutes !== null && <span className="chip">{toBnDigits(task.minutes)}′</span>}
          {task.milestone && (
            <span className="chip chip--alert" title="নির্ধারিত দিনে না হলে হোমে জমে থাকবে">
              ⚑ মাইলফলক
            </span>
          )}
          {task.repeat && (
            <span className="chip" title="শেষ করার দিন থেকে ১, ৩, ৭, ২১ দিনে না দেখে আবার">
              🔁 ঝালাই হবে
            </span>
          )}
          {task.sources.map((source) => (
            <Link key={`doc-${source.code}`} href={source.href} className="chip chip--accent" title="এই সাইটে ঐ ডক">
              ডক {source.label} · {source.title}
            </Link>
          ))}
          {checked && (
            <span className="chip chip--ok" title="কাজ শেষের তারিখ">
              ✓ {doneOn ? toBnDigits(doneOn) : "সম্পন্ন"}
            </span>
          )}
          {from && (
            <Link href={`/day/${from.code}/`} className="chip chip--accent">
              দিন {from.label}
            </Link>
          )}
        </div>

        {task.repeat && doneToday && (
          <p className="t-caption mt-2">
            এখনই খাতায় এক লাইন — কী ঘটল, কোথায় অস্বস্তি হলো। কাল ঝালাইয়ে ফিরবে, তখন আবার একবার। 🧠 The science of
            feedback
          </p>
        )}

        <PrincipleChips principles={task.principles} />
      </div>
    </li>
  );
}
