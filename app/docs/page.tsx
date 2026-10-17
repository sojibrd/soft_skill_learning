import type { Metadata } from "next";
import Link from "next/link";
import { getGuideDocs } from "../lib/guide";
import { getDocUses } from "../lib/plan";
import { toBnDigits } from "../lib/dates";

export const metadata: Metadata = { title: "ডক" };

/**
 * এই সাইটের ১৯টা অধ্যায়, চার স্তরে — কোনটা plan-এর কোন দিনে আসে।
 * রেফারেন্স; রোজ শুরু "আজ" থেকে। 🧠 Create a roadmap
 */
export default function DocsPage() {
  const uses = getDocUses();
  const docs = getGuideDocs();
  const groups = [...new Set(docs.map((doc) => doc.group))].map((group) => docs.filter((doc) => doc.group === group));
  const inPlan = docs.filter((doc) => uses[doc.code]).length;

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="t-title text-2xl sm:text-3xl">ডক</h1>
        <p className="t-body measure text-sm">
          ১৯টা অধ্যায়, চার স্তরে নির্ভরতার ক্রমে, লেখা হুবহু। plan-এর দিনে আসে {toBnDigits(inPlan)}টা — chip-এ কয়টা কাজে।
          পড়া ইনপুট; গোনা হয় আসল কথোপকথনে drill করা।
        </p>
      </header>

      {groups.map((items) => (
        <section key={items[0].group} className="surface-panel flex flex-col gap-3 p-4 sm:p-6">
          <h2 className="t-title text-base sm:text-lg">{items[0].groupLabel}</h2>
          <ul className="flex flex-col gap-1">
            {items.map((doc) => (
              <li key={doc.code}>
                <Link href={`/doc/${doc.code}/`} className="row flex items-center gap-3 px-3 py-2 text-sm">
                  <span className="t-mono shrink-0 text-xs">{doc.label}</span>
                  <span className="min-w-0 flex-1 truncate">{doc.title}</span>
                  {uses[doc.code] && (
                    <span className="chip chip--accent shrink-0">plan-এ {toBnDigits(uses[doc.code].length)}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
