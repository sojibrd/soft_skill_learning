import fs from "node:fs";
import path from "node:path";
import { slugify } from "./slug";

export { slugify };

const ROOT = process.cwd();
const DOCS_DIR = "docs";

/**
 * কনটেন্ট ফোল্ডার চেনার একমাত্র নিয়ম: `docs/`-এর নিচে যে ফোল্ডারের নাম
 * `<nn>-` দিয়ে শুরু, সেটাই একটা স্তর। এর ফলে `docs/plans/`-এর মতো
 * কাজের ফোল্ডার নিজে থেকেই বাদ পড়ে — কোনো ignore-তালিকা মেন্টেন করতে হয় না।
 */
const GROUP_PATTERN = /^\d\d-/;

export type Doc = {
  /** URL segments, e.g. ["01-self", "01-self-awareness"] */
  slug: string[];
  /** trailing slash সহ সাইট-route, e.g. "/01-self/01-self-awareness/" */
  route: string;
  /** রিপো-রিলেটিভ posix path, e.g. "docs/01-self/01-self-awareness.md" */
  file: string;
  /** সরাসরি parent ফোল্ডার — এটাই nav-এর গ্রুপ, e.g. "01-self" */
  group: string;
  /** প্রথম `# heading` অথবা ফাইলনাম থেকে */
  title: string;
};

export type NavGroup = {
  /** ফোল্ডারের নাম, e.g. "01-self" */
  id: string;
  /** মানুষের পড়ার নাম, e.g. "Self — নিজের সাথে" */
  label: string;
  items: Doc[];
};

/**
 * স্তরের প্রদর্শন-নাম। এখানে না থাকলে ফোল্ডারের নামই ব্যবহার হয় — অর্থাৎ
 * নতুন স্তর যোগ করলে সাইট ভাঙে না, শুধু লেবেলটা কাঁচা দেখায়।
 */
const GROUP_LABELS: Record<string, string> = {
  "00-start": "শুরু",
  "01-self": "১. নিজের সাথে",
  "02-thinking": "২. চিন্তার সাথে",
  "03-interpersonal": "৩. একজন মানুষের সাথে",
  "04-influence": "৪. অনেক মানুষের সাথে",
};

/** প্রথম `# heading` থেকে টাইটেল; না পেলে ফাইলের নাম থেকে বানানো */
export function readTitle(content: string, file: string): string {
  for (const line of content.split(/\r?\n/)) {
    const match = /^#\s+(.+?)\s*$/.exec(line);
    if (match) return match[1];
  }
  return path
    .basename(file, ".md")
    .replace(/^\d+[-_.]\s*/, "")
    .replace(/[-_]/g, " ");
}

let groupsCache: NavGroup[] | null = null;

function scan(): NavGroup[] {
  if (groupsCache) return groupsCache;

  const docsRoot = path.join(ROOT, DOCS_DIR);
  const groups: NavGroup[] = [];

  if (!fs.existsSync(docsRoot)) {
    groupsCache = groups;
    return groups;
  }

  const groupDirs = fs
    .readdirSync(docsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && GROUP_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

  const seenRoutes = new Set<string>();

  for (const groupId of groupDirs) {
    const files = fs
      .readdirSync(path.join(docsRoot, groupId), { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

    const items: Doc[] = files.map((fileName) => {
      const file = `${DOCS_DIR}/${groupId}/${fileName}`;
      const base = fileName.replace(/\.md$/i, "");
      const slug = [slugify(groupId), slugify(base)];
      const route = `/${slug.join("/")}/`;

      if (seenRoutes.has(route)) {
        throw new Error(`Route collision: "${route}" from "${file}"`);
      }
      seenRoutes.add(route);

      return {
        slug,
        route,
        file,
        group: groupId,
        title: readTitle(fs.readFileSync(path.join(ROOT, file), "utf8"), file),
      };
    });

    if (items.length > 0) {
      groups.push({ id: groupId, label: GROUP_LABELS[groupId] ?? groupId, items });
    }
  }

  groupsCache = groups;
  return groups;
}

export function getNav(): NavGroup[] {
  return scan();
}

/** nav-এর ক্রমে সমতল তালিকা — prev/next ও progress গণনার ভিত্তি */
export function getDocs(): Doc[] {
  return scan().flatMap((group) => group.items);
}

export function getDocBySlug(slug: string[]): Doc | undefined {
  const key = slug.join("/");
  return getDocs().find((doc) => doc.slug.join("/") === key);
}

export function readDoc(doc: Doc): string {
  return fs.readFileSync(path.join(ROOT, doc.file), "utf8");
}

export function getSiblings(doc: Doc): { prev?: Doc; next?: Doc } {
  const docs = getDocs();
  const index = docs.findIndex((item) => item.route === doc.route);
  if (index === -1) return {};
  return { prev: docs[index - 1], next: docs[index + 1] };
}

export type Heading = {
  /** anchor id — `slugify(text)`, TOC ও search দুটোই এটাতে নামে */
  id: string;
  text: string;
  /** 2 = `##`, 3 = `###` */
  level: number;
};

export type ParsedDoc = {
  title: string;
  /** `## অনুশীলন`-এর আগের সব markdown */
  before: string;
  /** প্রতিটি drill আলাদা markdown — প্রতিটির পাশে একটা checkbox বসবে */
  drills: string[];
  /** `## অনুশীলন`-এর পরের সব markdown (সাধারণত `## মূল নিয়ম`) */
  after: string;
  /** TOC-এর তালিকা; `## অনুশীলন` নিজেও এখানে থাকে যদিও সেটা আলাদা রেন্ডার হয় */
  headings: Heading[];
};

/**
 * TOC আর search — দুটোরই ভিত্তি এই একটাই ফাংশন। আলাদা full-text index না
 * বানানোর সিদ্ধান্তটা এখানেই ফল দেয়: heading-ই একমাত্র সূচক।
 *
 * Code fence-এর ভেতরের `#` মন্তব্য যেন heading হিসেবে ধরা না পড়ে, তাই
 * fence গোনা হয়।
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ id: slugify(text), text, level: match[1].length });
  }
  return headings;
}

/**
 * `## অনুশীলন` — **হুবহু** এই heading। `## অনুশীলন কীভাবে করবেন`-এর মতো
 * meta heading যেন drill সেকশন হিসেবে ধরা না পড়ে, তাই prefix নয়, পূর্ণ মিল।
 */
const DRILL_HEADING = "## অনুশীলন";

/** টানা `- ` বুলেটগুলোকে আলাদা drill-এ ভাঙে; ইন্ডেন্ট করা লাইন আগেরটার অংশ */
function splitDrills(lines: string[]): string[] {
  const drills: string[] = [];
  for (const line of lines) {
    if (/^-\s+/.test(line)) {
      drills.push(line.replace(/^-\s+/, ""));
    } else if (drills.length > 0 && line.trim() !== "") {
      drills[drills.length - 1] += `\n${line.trim()}`;
    }
  }
  return drills;
}

export function parseDoc(raw: string): ParsedDoc {
  const lines = raw.split(/\r?\n/);
  let title = "";
  const bodyLines: string[] = [];
  let foundH1 = false;

  for (const line of lines) {
    const h1 = /^#\s+(.+)$/.exec(line);
    if (!foundH1 && h1) {
      title = h1[1];
      foundH1 = true;
      continue;
    }
    bodyLines.push(line);
  }

  const body = bodyLines.join("\n");
  const headings = extractHeadings(body);

  const start = bodyLines.findIndex((line) => line.trim() === DRILL_HEADING);
  if (start === -1) {
    return { title: title || "ডকুমেন্ট", before: body.trim(), drills: [], after: "", headings };
  }

  const rest = bodyLines.slice(start + 1);
  const endOffset = rest.findIndex((line) => line.startsWith("## "));
  const end = endOffset === -1 ? bodyLines.length : start + 1 + endOffset;

  return {
    title: title || "ডকুমেন্ট",
    before: bodyLines.slice(0, start).join("\n").trim(),
    drills: splitDrills(bodyLines.slice(start + 1, end)),
    after: bodyLines.slice(end).join("\n").trim(),
    headings,
  };
}

/** Sidebar search-এর "বিষয়" গ্রুপ — সব ডকের সব heading, সমতল */
export type HeadingIndexEntry = {
  docRoute: string;
  docTitle: string;
  headingId: string;
  headingText: string;
};

export function getHeadingIndex(): HeadingIndexEntry[] {
  return getDocs().flatMap((doc) =>
    parseDoc(readDoc(doc)).headings.map((heading) => ({
      docRoute: doc.route,
      docTitle: doc.title,
      headingId: heading.id,
      headingText: heading.text,
    })),
  );
}

/** প্রতিটি ডকের drill সংখ্যা — Shell-এ গণনার জন্য, বারবার ফাইল না পড়ে */
export function getDrillCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const doc of getDocs()) counts[doc.route] = parseDoc(readDoc(doc)).drills.length;
  return counts;
}
