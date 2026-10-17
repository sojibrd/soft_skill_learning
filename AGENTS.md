# soft_skill_learning — Agent Instructions

সফট স্কিলের দিনভিত্তিক সাইট — ৯৪ দিন: ৯০ দিনে একটা করে drill, আর চার ব্লকের শেষে একটা করে ⚑। chassis `behavioural_interview_local_company` থেকে (২০২৬-১০-১৭); তিন repo-র পরিবার নয়, একটাই সাইট। তার আগে এটা ছিল পুরনো ছাঁচের রোডম্যাপ — অধ্যায়, drill-এর checkbox, `localStorage`-only।

- **`guide/` = এই সাইটের নিজের ১৯টা অধ্যায়**, পুরনো `docs/` থেকে হুবহু, চার স্তরে নির্ভরতার ক্রমে (`guide/<nn>-<স্তর>/<nn>-<slug>.md`)। **সম্পাদনা নয়** — behavioural-এর নজির। ০০.০২ ("সাইট কীভাবে ব্যবহার করবেন") পুরনো সাইট বর্ণনা করে; যেটুকু এখন খাটে না, তা `docs/00-rules.md`-এ লেখা। অধ্যায়ের ভেতরের relative `.md` লিংক `app/lib/guide.ts` রেন্ডারের আগে `/doc/<স্তর>-<ডক>/`-এ বদলায় — chassis-এ এটা ছিল না, কারণ behavioural-এর গাইডে এমন লিংক নেই।
- **`docs/` = plan** — `00-rules.md` আর ৪টা ব্লক, স্তরের ক্রমে; `00-start`-এর ৪টা drill ব্লক ১-এ। দিনের শিরোনাম = drill-এর bold শিরোনাম হুবহু (শেষের "।" বাদে), আর ৯০টা drill গাইডের ক্রমেই। দিনের নম্বর পরপর না হলে build ভাঙে; ফাইলে তারিখ নেই, "আজ" = ক্যালেন্ডারের তারিখ। `docs/plans/` পুরনো দুই প্ল্যান — `plan.ts` শুধু `^\d\d-.*\.md` নেয়, তাই সাইটে যায় না।
- কাজে `(ডক ০৩.০১)` = `guide/`-এর স্তর.অধ্যায়; না মিললে **build ভাঙে**।
- **একটা drill = একটা দিন, "আজ একবার" মাপে** (ব্যবহারকারী, ২০২৬-১০-১৭)। কাজের লেখা drill আর তার অধ্যায় থেকে — নতুন দাবি নয়। কাজের শেষে `পূর্ণ মাপে:` (কয়েক দিনের drill) বা `সুযোগ এলে:` (ঘটনা-নির্ভর) = গাইডের পুরো drill, টিকের শর্ত নয়।
- **ঘটনা-নির্ভর drill** (প্রায় অর্ধেক — সমালোচনা পাওয়া, মিটিং, উপস্থাপনা) — কাজ = যেটুকু আজই করা যায়: শেষবারের ঘটনা খাতায় আর পরের বারের বাক্য। ঘটনা ব্যবহারকারীর হাতে থাকলে (প্রশংসা, প্রশ্ন, কাউকে জিজ্ঞেস) কাজ আজই। ব্যবহারকারীর সিদ্ধান্ত, ২০২৬-১০-১৭।
- **🔁 মিশ্র** (ব্যবহারকারী, ২০২৬-১০-১৭) — ঝালাই ১/৪ = আবার করা, ২/৪–৪/৪ = নাম দেখে, গাইড না খুলে, ইংরেজিতে মুখে দুই বাক্য। কারণ: সব ঝালাই আবার করা হলে দিন ২২ থেকে রোজ প্রায় পাঁচটা আলাদা আচরণ। নির্দেশটা `app/components/ReviewList.tsx`-এর `reviewHow()` আর `Hint`-এ — chassis থেকে একমাত্র আচরণের বদল। একবারের লেখা বা সিদ্ধান্তের drill-এ 🔁 নেই — ৮০টা কাজে আছে।
- ⚑ দিন: গাইড না খুলে, ইংরেজিতে, জোরে, ২ মিনিটে, রেকর্ড করে — ব্লকের অধ্যায়গুলোর তিনটা মূল নিয়ম আর নিজের একটা ঘটনা। 🔁 নেই।
- **সময় ⏳** — দিনের ১০′ সপ্তাহে ৭ ঘণ্টার ভেতরে না বাইরে, আর বাকি learning সাইটের সাথে একসাথে না পরপর — ব্যবহারকারীর উত্তর বাকি। `suggestedStart` তাই `null`; কোনো plan-এর ঘর থেকে সময় কাটবেন না। `brainstorming/soft-technical-and-ai-skill.md` soft skill-এর সাইটকে "ফাঁদ" বলে — অমিলটা `brainstorming/thought-map.md`-এ ⏳; নিজে মীমাংসা করবেন না।
- 🧠 নাম → `app/lib/principles.ts`, `postgres_learning`-এর কপি (`learning_to_learn`-এর ৫৭টা বিষয়, লিংক ঐ সাইটের লাইভ Pages-এ)। ওখানে বদলালে এখানেও।
- Progress চার key (`ssl:v1:start`, `task`, `check`, `review`) — একমাত্র `app/hooks/useProgress.ts` দিয়ে; পঞ্চম key `ssl:v1:meta` শুধু sync-এর timestamp। prefix `ssl` পুরনো সাইটের; পুরনো `ssl:v1:read` আর `ssl:v1:drill` কোড পড়ে না, sync-ও করে না। কাজের লেখা বদলালে ঐ কাজের টিক হারায় (id = দিন + লেখার hash)।
- **Cross-device sync** — বাকি সাইটের মতোই: `app/lib/supabase.ts`, `app/hooks/useSync(Key).ts`, `app/components/SyncSettings.tsx`, `app/sync/page.tsx` chassis থেকে হুবহু, নিজে থেকে বদলাবেন না। `site_prefix` = `SITE.storagePrefix` = `ssl`। `deploy.yml` `postgres_learning` থেকে; env নাম `NEXT_PUBLIC_SUPABASE_*` — বদলালে sync চুপচাপ মরে যাবে।
- `app/lib/plan.ts` আর `app/lib/guide.ts` server-only।
- **Theme contract অলঙ্ঘনীয়**, সাইট **dark-only**। যাচাই: `rg -n "rounded-|shadow-|text-zinc|bg-zinc|uppercase|font-bold|dark:" app/components app/page.tsx` — আউটপুট খালি।

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
