# soft_skill_learning — Agent Instructions

সফট স্কিল শেখার বাংলা রোডম্যাপ। Next.js 16 + React 19 + TS + Tailwind v4 + react-markdown, static export → GitHub Pages।
লাইভ: https://sojibrd.github.io/soft_skill_learning/

কোনো কাজ শুরুর আগে `README.md` পড়ুন — কাঠামো, ডক লেখার নিয়ম ও Theme Contract ওখানে।

## Invariants

- সব response বাংলায় দিন।
- ব্যাখ্যা বাংলায়, technical term ইংরেজিতে।
- Next.js 16 conventions কঠোরভাবে মানুন।

## Content

- ১৯টি ডক, ৪ স্তরে নির্ভরতার ক্রমে: `00-start` → `01-self` → `02-thinking` → `03-interpersonal` → `04-influence`। Leadership শেষে — ওটা আলাদা স্কিল নয়, বাকি সবের যোগফল।
- প্রতিটি স্কিল-ডক ৫ সেকশন, এই ক্রমে: `## সংজ্ঞা` → `## কেন এটা কঠিন` → `## কীভাবে কাজ করে` → `## অনুশীলন` → `## মূল নিয়ম`।
- **`## অনুশীলন` হুবহু এই heading।** এর প্রতিটি টপ-লেভেল `- ` বুলেট সাইটে একটা checkbox হয়। prefix-match করবেন না — নইলে `## অনুশীলন কীভাবে করবেন`-এর মতো heading drill সেকশন হিসেবে ধরা পড়বে।
- route ও nav স্ক্যান থেকে **স্বয়ংক্রিয়** — কোথাও তালিকা হার্ডকোড নয়। নতুন ডক = স্তর-ফোল্ডারে পরের নম্বরের `.md`।
- scanner শুধু `^\d\d-` ফোল্ডার নেয়, তাই `docs/plans/` নিজে থেকেই বাদ। নতুন স্তরের লেবেল `app/lib/content.ts`-এর `GROUP_LABELS`-এ।

## Architecture

- `app/lib/content.ts` সম্পূর্ণ **server-only** — client component থেকে কখনো import করবেন না।
- **সরাসরি `localStorage` নয়** — সব progress কেবল `app/hooks/useProgress.ts` দিয়ে (`useSyncExternalStore`-ভিত্তিক)। static export-এ প্রথম render-এ storage থাকে না; সরাসরি পড়লে hydration mismatch।
- Key স্কিমা: `ssl:v1:read`, `ssl:v1:drill`। বদলালে `v1` বাড়ান।
- `page.tsx` পাতলা রাখুন — data এনে কম্পোনেন্টে পাঠাবে, নিজে UI লিখবে না।
- **Shell `layout.tsx`-এ, page-এ নয়** — নইলে route বদলালে দুটো navigation কলাম আলাদা হয়ে যায়। `getNav()` / `getHeadingIndex()` / `getDrillCounts()` server-এ চলে, props হয়ে client `Shell`-এ যায়।
- **TOC ও search একই ভিত্তি** — `extractHeadings()`। anchor id = `slugify(heading text)`, আর `Markdown.tsx`-এর `h2`/`h3` রেন্ডারার হুবহু একই নিয়মে id বসায়। নিয়ম দুটো আলাদা হলে লিংক নীরবে ভাঙে। `## অনুশীলন`-এর id `DrillList`-এ হাতে বসানো, কারণ ওটা Markdown-এর বাইরে রেন্ডার হয়।
- Breakpoint: rail `lg:`, TOC `xl:`, Navbar `lg:hidden`। collapse key `ssl_nav_collapsed`।

## Theme Contract — অলঙ্ঘনীয়

`system_design`-এর dark-only *control-room* কনট্র্যাক্ট, ক্যানভাসের role বাদে।

- কম্পোনেন্টে **কোনো ভিজ্যুয়াল ক্লাস নয়** — রঙ, `rounded-*`, `shadow-*`, `border-2`, `uppercase`, `tracking-*`, `font-bold` কোনোটাই না। সব role class-এ (`surface-panel`, `t-title`, `control`, `chip`, `row`, `gauge`)।
- Tailwind শুধু লেআউটের জন্য।
- অবস্থা যায় `aria-pressed` / `aria-current` / `data-state`-এ; চেহারা ঠিক করে CSS।
- সাইট **dark-only** — `dark:` variant বা `.dark` ক্লাস নয়।
- একমাত্র ব্যতিক্রম `.doc-prose` — markdown-এর raw element, সব মান `--t-doc-*` থেকে।
- থিম বদলানোর একমাত্র জায়গা: `app/globals.css`-এর উপরের `@import "./themes/control-room.css";`

যাচাই: `grep -rn "rounded-\|shadow-\|text-zinc\|bg-zinc\|uppercase\|font-bold\|dark:" app/components app/page.tsx` — আউটপুট খালি হওয়া উচিত।

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
