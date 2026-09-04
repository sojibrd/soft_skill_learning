# Implementation Plan — soft_skill_learning

তারিখ: ২০২৬-০৯-০৫

## আমরা কী তৈরি করছি

`soft_skill_learning/` — সফট স্কিল শেখার একটি বাংলা roadmap সাইট, যেখানে ১৯টি ডক চারটি নির্ভরতা-ভিত্তিক স্তরে সাজানো: নিজেকে সামলানো → স্পষ্ট চিন্তা → মানুষের সাথে কাজ → প্রভাব বিস্তার। প্রতিটি ডক একই ৫-সেকশন টেমপ্লেট মানে এবং শেষে সুনির্দিষ্ট অনুশীলন (drill) দেয়। সাইটটি শুধু পড়ার রেফারেন্স নয় — ইউজার কোন ডক পড়েছেন এবং কোন drill করেছেন তা `localStorage`-এ ট্র্যাক করে, nav ও হোমপেজে progress দেখায়।

Stack ও কনভেনশন AGENTS.md প্রজেক্ট #৮-এ আগেই নির্ধারিত: Next.js 16 + React 19 + TS + Tailwind v4 + react-markdown, static export → GitHub Pages, dark-only, theme contract অলঙ্ঘনীয়, route ও nav স্ক্যান থেকে স্বয়ংক্রিয়।

## যে পরিভাষাগুলোতে আমরা সম্মত হয়েছি

- **Soft skill**: মানুষ ও নিজের সাথে কাজ করার আচরণগত দক্ষতা, যা অনুশীলনে বাড়ে কিন্তু certificate দিয়ে প্রমাণ হয় না। বিপরীত — hard skill (React, SQL)।
- **Expert হওয়া**: পড়ে জানা নয়, বাস্তব পরিস্থিতিতে (মিটিং, code review, disagreement, deadline) সচেতনভাবে প্রয়োগ করতে পারা। তাই সাইট অনুশীলনের নির্দেশনা দেবে।
- **Step by step**: ক্রমিক roadmap — আগেরটা না বুঝে পরেরটায় গেলে কাজ হবে না। ফ্ল্যাট "যখন যা দরকার" রেফারেন্স নয়।
- **ইউজারের ১১টি আইটেম**: চূড়ান্ত অধ্যায়-তালিকা নয়, কাঁচামাল। পুনর্গঠনের অনুমতি দেওয়া হয়েছে।

## নেওয়া সিদ্ধান্তসমূহ

### সিদ্ধান্ত ১ — নির্ভরতা-ভিত্তিক ৪ স্তরের ক্রম

অধ্যায় সাজানো হবে "নিচেরটা না পারলে উপরেরটা কাজ করে না" যুক্তিতে, জনপ্রিয়তা বা সহজ→কঠিন ক্রমে নয়। কারণ শুধু এই যুক্তিই ব্যাখ্যা করে *কেন* ৫ নম্বরের আগে ২ নম্বর লাগবে — অর্থাৎ "step by step"-কে সত্যিকারের মানে দেয়।

| স্তর | কী | কেন এখানে |
|---|---|---|
| ১. Self | Self-awareness, Emotional Intelligence, Adaptability, Time Management | নিজের আবেগ না চিনলে অন্যের আবেগ পড়া অসম্ভব। EI বাকি সবের ইঞ্জিন। |
| ২. Thinking | Critical Thinking, Problem Solving, Decision Making | নিজেকে সামলানোর পর — একা বসে স্পষ্ট চিন্তা। |
| ৩. Interpersonal | Listening, Communication, Writing, Feedback, Conflict, Teamwork | চিন্তা স্পষ্ট হলে তবেই অন্যকে বোঝানো যায়। Listening আগে, Speaking পরে। |
| ৪. Influence | Presentation, Persuasion/Negotiation, Customer Service, Leadership | উপরের তিন স্তরের যৌথ প্রয়োগ। Leadership শেষে — ওটা আলাদা স্কিল নয়, বাকি সবের যোগফল। |

ইউজারের ১১টি আইটেমের প্রতিটি এর ভিতরে আছে। যোগ হয়েছে: Self-awareness, Listening, Feedback, Conflict, Writing, Persuasion/Negotiation।

### সিদ্ধান্ত ২ — প্রতিটি ডকের ৫-সেকশন টেমপ্লেট

```
## সংজ্ঞা          — স্কিলটা আসলে কী, এক প্যারা
## কেন এটা কঠিন    — সাধারণ ভুল ও ফাঁদ, যেগুলো মানুষ নিজে ধরতে পারে না
## কীভাবে কাজ করে   — মূল মডেল বা কাঠামো (Feedback → SBI, Conflict → Interest vs Position)
## অনুশীলন          — ৩–৫টি সুনির্দিষ্ট drill, প্রতিটি আলাদা list item
## মূল নিয়ম         — ৫–৭টি এক-লাইনের imperative নিয়ম
```

"কেন এটা কঠিন" ইচ্ছাকৃত — soft skill-এর মূল সমস্যা তথ্যের অভাব নয়, নিজের ভুল নিজে দেখতে না পাওয়া। "অনুশীলন" ছাড়া সাইটটা আরেকটা blog হয়ে যেত। টেমপ্লেট সব ডকে অভিন্ন, যাতে ১৯টি ডকে পড়ার অভ্যাস তৈরি হয়। শুরু ও শেষ সেকশন AGENTS.md-এর বাধ্যবাধকতা।

### সিদ্ধান্ত ৩ — দুই স্তরের progress tracking

1. **ডক-লেভেল** — প্রতিটি ডকের নিচে "পড়া শেষ" টগল; nav-এ ✓; হোমপেজে স্তরভিত্তিক progress (`Self — ৩/৪`)।
2. **অনুশীলন-লেভেল** — `## অনুশীলন` সেকশনের প্রতিটি drill আলাদা checkbox।

শুধু "পড়া শেষ" রাখলে ট্র্যাকিং মিথ্যা বলত (soft skill পড়ে শেষ হয় না); শুধু drill রাখলে "কতদূর এগোলাম" এক নজরে বোঝা যেত না। তাই ডক-লেভেল = map, drill-লেভেল = আসল কাজ।

সাথে যা আসে:
- state-এর একমাত্র মালিক `app/lib/progress.ts` — একটি `useProgress` hook। কোথাও ছড়ানো `localStorage` কল নয়।
- key স্কিমা: `ssl:v1:read:<docSlug>`, `ssl:v1:drill:<docSlug>:<index>`। `v1` রাখা হয়েছে ভবিষ্যৎ migration-এর জন্য।
- `## অনুশীলন`-এর `<li>`-গুলোকে react-markdown-এর custom renderer দিয়ে checkbox বানাতে হবে — এই ফিচারের একমাত্র জটিল অংশ।
- static export-এ প্রথম render-এ `localStorage` নেই, তাই সব progress UI mount-এর পরে দেখাবে (hydration mismatch এড়াতে)।
- হোমপেজে "সব progress মুছুন" বোতাম।

## অনুমানসমূহ (Assumptions)

- **কনটেন্ট ভলিউম**: ১৯টি ডক (নিচের তালিকা)। প্রথম ধাপে সব ডকের কাঠামো + `00-start` ও স্তর ১ সম্পূর্ণ লেখা হবে; স্তর ২–৪ পরবর্তী ধাপে। এক দফায় ১৯টি পূর্ণ ডক লেখা মানে কোয়ালিটি পড়ে যাওয়া।
- **`docs/plans/` route হবে না** — content scanner শুধু `^\d\d-` প্যাটার্নের ফোল্ডার নেবে, তাই `plans` স্বাভাবিকভাবেই বাদ পড়ে। এই নিয়মটি scanner-এ স্পষ্টভাবে থাকতে হবে।
- GitHub repo `sojibrd/soft_skill_learning` ইতিমধ্যে আছে (README-তে লিংক ও live URL লেখা)। basePath = `/soft_skill_learning`।
- ভাষা: ব্যাখ্যা বাংলায়, technical term ইংরেজিতে। ফাইলনাম ইংরেজি kebab-case।
- progress ডিভাইস-বদ্ধ — sync বা export নেই।

## অধ্যায় তালিকা (ফাইল কাঠামো)

```
docs/
  00-start/
    01-what-is-soft-skill.md
    02-how-to-use-this-site.md
  01-self/
    01-self-awareness.md
    02-emotional-intelligence.md
    03-adaptability.md
    04-time-management.md
  02-thinking/
    01-critical-thinking.md
    02-problem-solving.md
    03-decision-making.md
  03-interpersonal/
    01-listening.md
    02-communication.md
    03-writing.md
    04-feedback.md
    05-conflict.md
    06-teamwork.md
  04-influence/
    01-presentation.md
    02-persuasion-negotiation.md
    03-customer-service.md
    04-leadership.md
```

## যেভাবে এটি তৈরি করতে হবে

1. **Scaffold** — `nextjs-pages` skill দিয়ে `soft_skill_learning/`-এ Next.js 16 + TS + Tailwind v4 প্রজেক্ট; static export, `basePath: "/soft_skill_learning"`, GitHub Actions workflow।
2. **Theme foundation** — `app/globals.css`-এ `--t-*` টোকেন ও role class; dark-only। `system_design`/`legacy_and_wisdom`-এর প্যাটার্ন অনুসরণ।
3. **Content pipeline** — `app/lib/content.ts` (server-only): `docs/` স্ক্যান করে `^\d\d-` ফোল্ডার ও ফাইল থেকে group + doc tree তৈরি; nav গ্রুপ = সরাসরি parent ফোল্ডার।
4. **Routing + layout** — `app/[...slug]/page.tsx` + `generateStaticParams`; sidebar nav ও ডক renderer (react-markdown)।
5. **Progress layer** — `app/lib/progress.ts` (`useProgress`), ডক-শেষে "পড়া শেষ" টগল, nav-এ ✓, `## অনুশীলন`-এর custom `<li>` checkbox renderer, mount-gated rendering।
6. **হোমপেজ** — ৪ স্তরের roadmap ভিউ + স্তরভিত্তিক progress + "সব progress মুছুন"।
7. **কনটেন্ট (ধাপ ১)** — `00-start` ২টি + `01-self` ৪টি ডক পূর্ণ ৫-সেকশন টেমপ্লেটে; বাকি ১৩টি ফাইল কাঠামোসহ placeholder।
8. **Build যাচাই** — local `next build` + export; nav, route, progress সব ঠিক আছে কিনা দেখা।
9. **Deploy** — push, Pages workflow চালু, live URL যাচাই।
10. **কনটেন্ট (ধাপ ২)** — স্তর ২–৪-এর ১৩টি ডক পূর্ণ করা।
11. **Cleanup** — README টেবিল ইতিমধ্যে আছে, শুধু যাচাই; AGENTS.md #৮ বাস্তবতার সাথে মিলিয়ে নেওয়া (progress tracking-এর উল্লেখ যোগ)।
