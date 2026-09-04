# soft_skill_learning

সফট স্কিল শেখার বাংলা রোডম্যাপ — ১৯টি অধ্যায়, চারটি নির্ভরতা-ভিত্তিক স্তরে সাজানো।

**লাইভ:** https://sojibrd.github.io/soft_skill_learning/

---

## কাঠামো

অধ্যায়ের ক্রম নির্ভরতার — নিচের স্তর না পারলে উপরের স্তর কাজ করে না।

| স্তর | ফোল্ডার | অধ্যায় |
|---|---|---|
| শুরু | `docs/00-start/` | সফট স্কিল কী, সাইট কীভাবে ব্যবহার করবেন |
| ১. নিজের সাথে | `docs/01-self/` | Self-awareness, Emotional Intelligence, Adaptability, Time Management |
| ২. চিন্তার সাথে | `docs/02-thinking/` | Critical Thinking, Problem Solving, Decision Making |
| ৩. একজন মানুষের সাথে | `docs/03-interpersonal/` | Listening, Communication, Writing, Feedback, Conflict, Teamwork |
| ৪. অনেক মানুষের সাথে | `docs/04-influence/` | Presentation, Persuasion/Negotiation, Customer Service, Leadership |

## ডক লেখার নিয়ম

প্রতিটি স্কিল-ডক একই পাঁচ সেকশন মানে, এই ক্রমে:

```
# শিরোনাম
## সংজ্ঞা          — স্কিলটা আসলে কী
## কেন এটা কঠিন    — যে ভুলগুলো নিজে ধরা যায় না
## কীভাবে কাজ করে   — মূল model বা কাঠামো
## অনুশীলন          — ৩–৫টি drill, প্রতিটি আলাদা `- ` বুলেট
## মূল নিয়ম         — ৫–৮টি এক-লাইনের imperative নিয়ম
```

- ব্যাখ্যা বাংলায়, technical term ইংরেজিতে।
- `## অনুশীলন` — **হুবহু** এই heading। এর প্রতিটি টপ-লেভেল বুলেট সাইটে একটা checkbox হয়ে যায়, তাই `## অনুশীলন কীভাবে করবেন`-এর মতো ভিন্ন heading drill হিসেবে ধরা পড়বে না।
- নতুন অধ্যায় = স্তর-ফোল্ডারে পরের নম্বরের `.md` ফাইল। route ও nav স্ক্যান থেকে **স্বয়ংক্রিয়** — কোথাও তালিকা হার্ডকোড নেই।
- নতুন স্তর = `docs/`-এ `<nn>-<নাম>/` ফোল্ডার, আর `app/lib/content.ts`-এর `GROUP_LABELS`-এ একটা লেবেল।

> `docs/plans/` স্ক্যানে আসে না — scanner শুধু `<nn>-` দিয়ে শুরু হওয়া ফোল্ডার নেয়।

## Progress tracking

দুই স্তরে, সবটাই ব্রাউজারের `localStorage`-এ (ডিভাইস-বদ্ধ, কোথাও পাঠানো হয় না):

- **ডক-লেভেল** — প্রতিটি ডকের নিচে "পড়া হয়েছে" টগল; nav-এ ✓, হোমপেজে স্তরভিত্তিক gauge।
- **drill-লেভেল** — `## অনুশীলন`-এর প্রতিটি বুলেটে আলাদা checkbox।

Key স্কিমা `ssl:v1:read` ও `ssl:v1:drill`। সব পড়া-লেখা কেবল `app/hooks/useProgress.ts` দিয়ে — কোনো কম্পোনেন্ট সরাসরি `localStorage` ছোঁয় না, নইলে static export-এ hydration mismatch হয়।

`/progress` পাতায় ৫টি filter: সব অধ্যায় · পড়া হয়নি · **drill বাকি** · drill শুরুই হয়নি · সম্পূর্ণ।
তৃতীয়টাই মূল — সাইটের যুক্তি হলো *পড়া ≠ পারা*, আর ওই filter ঠিক সেই ফাঁকটা দেখায়।
Export/import ইচ্ছাকৃতভাবে নেই।

## স্ট্যাক

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + react-markdown, static export → GitHub Pages।

```
app/
├── layout.tsx           → ৫-ফন্টের শেল্ফ, metadata; nav/index এনে Shell-এ পাঠায়
├── page.tsx             → হোম (পাতলা) → components/Home.tsx
├── [...slug]/page.tsx   → ডক পাতা + DocToc, generateStaticParams
├── progress/            → অগ্রগতির পাতা (page.tsx + ProgressClient.tsx)
├── globals.css          → role class — চেহারার কাঠামো
├── themes/              → control-room.css — `--t-*` টোকেনের মান
├── components/
│   ├── Shell.tsx        → chassis: Navbar + rail + drawer + `/` শর্টকাট
│   ├── Navbar.tsx       → `lg:` নিচের টপ বার
│   ├── Sidebar.tsx      → স্তর → অধ্যায় তালিকা + search
│   ├── DocToc.tsx       → ডানদিকের "এই পাতায়", scroll-spy
│   └── ui/              → Panel, Button, Badge, Callout, Rule, Sheet
├── hooks/               → useLocalStorage, useProgress
└── lib/                 → content.ts (server-only scanner), slug.ts
docs/                    → কনটেন্ট
```

## Navigation ও search

`Shell` chassis-টা `layout.tsx`-এ বসে, page-এ নয় — তাই `/` থেকে `/progress`-এ গেলে
navigation কলাম একটাই থাকে। Breakpoint: rail `lg:`, TOC `xl:`, Navbar `lg:hidden`।
rail ভাঁজ করা অবস্থা `ssl_nav_collapsed`-এ। `/` বা `Ctrl+K` search-এ ফোকাস করে।

Search দুই গ্রুপে ফল দেয় — **অধ্যায়** (টাইটেল ম্যাচ) আর **বিষয়** (heading ম্যাচ,
সরাসরি `#anchor`-এ নামায়)। full-text নয়।

**TOC আর search একই ভিত্তির উপর দাঁড়ানো** — `content.ts`-এর `extractHeadings()`।
Heading-এর anchor id = `slugify(heading text)`, আর `Markdown.tsx`-এর `h2`/`h3`
রেন্ডারার ঠিক একই নিয়মে id বসায়। দুটো আলাদা হয়ে গেলে লিংক নীরবে কোথাও নামবে না।

> `## অনুশীলন` সেকশনটা `DrillList` আলাদা রেন্ডার করে, তাই তার anchor id
> সেখানে **হাতে** বসানো — নইলে TOC-এর ওই লাইনটা কাজ করত না।

## Theme Contract

চেহারার সব সিদ্ধান্ত CSS-এ, কম্পোনেন্টে নয় — `system_design`-এর dark-only *control-room* কনট্র্যাক্ট।

1. কম্পোনেন্টে কোনো ভিজ্যুয়াল ক্লাস নয় — রঙ, `rounded-*`, `shadow-*`, `uppercase`, `font-bold` কোনোটাই না।
2. Tailwind শুধু লেআউটের জন্য।
3. অবস্থা যায় `aria-pressed` / `aria-current`-এ; চেহারা ঠিক করে CSS।
4. সাইট dark-only — `dark:` variant নেই।
5. একমাত্র ব্যতিক্রম `.doc-prose` — markdown-এর raw element, `--t-doc-*` থেকে পড়া।

থিম বদলাতে `app/globals.css`-এর উপরের `@import "./themes/control-room.css";` লাইনটাই একমাত্র জায়গা।

## চালানো

```bash
npm install
npm run dev            # http://localhost:3000

# CI-এর মতো build (basePath সহ)
GITHUB_ACTIONS=true npm run build
```

Deploy স্বয়ংক্রিয় — `master`-এ push হলে `.github/workflows/deploy.yml` চলে।
