import fs from "node:fs";
import path from "node:path";
import { toBnDigits } from "./dates";

/**
 * server-only — `fs` দিয়ে build-এর সময় `guide/` পড়ে। client component এখান থেকে
 * শুধু `import type` নিতে পারে; মান import করলে `fs` bundle-এ ঢুকে build ভাঙবে।
 *
 * `guide/` = এই সাইটের নিজের ২২টা অধ্যায়, চার স্তরে নির্ভরতার ক্রমে
 * (`guide/<nn>-<স্তর>/<nn>-<slug>.md`)। কাজের লেখায় `(ডক ০৩.০১)` মানে স্তর ০৩-এর
 * ডক ০১ — ফাইলটা না থাকলে build ভাঙে (`plan.ts`)।
 */
const GUIDE_DIR = path.join(process.cwd(), "guide");
const NUMBERED_RE = /^\d\d-/;

/** স্তরের ফোল্ডার → লেবেল; নতুন স্তর যোগ হলে এখানে */
const GROUP_LABELS: Record<string, string> = {
  "00-start": "শুরু",
  "01-self": "১. নিজের সাথে",
  "02-thinking": "২. চিন্তার সাথে",
  "03-interpersonal": "৩. একজন মানুষের সাথে",
  "04-influence": "৪. অনেক মানুষের সাথে",
};

/**
 * অধ্যায়ের ভেতরের relative লিংক — `(01-what-is-soft-skill.md)` বা
 * `(../02-thinking/02-problem-solving.md)` — এই সাইটের `/doc/<স্তর>-<ডক>/` route-এ।
 * ফাইলের লেখা বদলায় না; শুধু রেন্ডারের আগে।
 */
const RELATIVE_DOC_RE = /\]\((?:\.\.\/(\d\d)-[^/)]+\/)?(\d\d)-[^/)]+\.md(#[^)]*)?\)/g;

function linkRelativeDocs(body: string, group: string): string {
  return body.replace(
    RELATIVE_DOC_RE,
    (_, otherGroup: string | undefined, num: string, anchor: string | undefined) =>
      `](/doc/${otherGroup ?? group.slice(0, 2)}-${num}/${anchor ?? ""})`,
  );
}

export type GuideDoc = {
  /** ASCII — route ও key, e.g. "02-02" */
  code: string;
  /** কাজের টোকেনের মতো, e.g. "০৩.০১" */
  label: string;
  /** স্তরের ফোল্ডার, e.g. "03-interpersonal" */
  group: string;
  groupLabel: string;
  /** ডকের H1 হুবহু */
  title: string;
  /** H1 বাদে বাকি markdown */
  body: string;
};

let docsCache: GuideDoc[] | null = null;

export function getGuideDocs(): GuideDoc[] {
  if (docsCache) return docsCache;

  const docs: GuideDoc[] = [];
  for (const group of fs.readdirSync(GUIDE_DIR).filter((name) => NUMBERED_RE.test(name)).sort()) {
    const dir = path.join(GUIDE_DIR, group);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir).filter((name) => NUMBERED_RE.test(name) && name.endsWith(".md")).sort()) {
      const lines = fs.readFileSync(path.join(dir, file), "utf8").split(/\r?\n/);
      const h1 = lines.findIndex((line) => /^#\s+/.test(line));
      docs.push({
        code: `${group.slice(0, 2)}-${file.slice(0, 2)}`,
        label: toBnDigits(`${group.slice(0, 2)}.${file.slice(0, 2)}`),
        group,
        groupLabel: GROUP_LABELS[group] ?? group,
        title: h1 === -1 ? file.replace(/\.md$/, "") : lines[h1].replace(/^#\s+/, "").trim(),
        body: linkRelativeDocs(
          lines
            .filter((_, i) => i !== h1)
            .join("\n")
            .trim(),
          group,
        ),
      });
    }
  }

  docsCache = docs;
  return docs;
}

/** `(ডক ০২.০২)` → স্তর ২, ডক ২ */
export function findGuideDoc(group: number, num: number): GuideDoc | undefined {
  const code = `${String(group).padStart(2, "0")}-${String(num).padStart(2, "0")}`;
  return getGuideDocs().find((doc) => doc.code === code);
}
