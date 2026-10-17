# soft_skill_learning — Agent Instructions

সফট স্কিলের দিনভিত্তিক সাইট — ১০৮ দিন: ১০৪ দিনে একটা করে drill, আর চার ব্লকের শেষে একটা করে ⚑। chassis `behavioural_interview_local_company` থেকে (২০২৬-১০-১৭); তিন repo-র পরিবার নয়, একটাই সাইট। একই দিনে গাইড পরের স্তরে নতুন করে লেখা — ব্যবহারকারীর সিদ্ধান্ত।

- **`guide/` = এই সাইটের নিজের ২২টা অধ্যায়**, চার স্তরে নির্ভরতার ক্রমে (`guide/<nn>-<স্তর>/<nn>-<slug>.md`)। নিজের লেখা, তাই সম্পাদনা চলে — কিন্তু গড়ন স্থির:
  - স্কিল-অধ্যায়ে আটটা সেকশন, এই ক্রমে: `## সংজ্ঞা` → `## কেন এটা কঠিন` → `## কীভাবে কাজ করে` → `## রিমোট আর দ্বিতীয় ভাষায়` → `## Senior থেকে Staff` → `## অনুশীলন` → `## মূল নিয়ম` → `## উৎস`। ০০.০১-এও আটটা; ০০.০২ সাইটের বর্ণনা, drill নেই।
  - "পরের স্তর" = তিনটা একসাথে (ব্যবহারকারী, ২০২৬-১০-১৭): মূল লেখা যেকোনো পাঠকের জন্য গভীরে; রিমোট আর দ্বিতীয় ভাষা (ইংরেজি); Senior → Lead → Staff-এর মই। ব্যক্তিগত প্রসঙ্গ গাইডে নয়, plan-এর কাজে।
  - **উৎসের নিয়ম** — সংখ্যা, গবেষণার ফল বা কারো নামে কথা শুধু web-এ যাচাই করা উৎস থেকে; যাচাই না হলে বাদ, বা "অভিজ্ঞতায়"-এর ভাষায়। কৌশল আর পরামর্শে উৎস বাধ্যতামূলক নয়। যে সাল বা পাতার নম্বর মেলেনি, সেটা উৎসের তালিকায় নেই।
  - প্রতিটা স্কিল-অধ্যায়ে পাঁচটা drill, এই ক্রমে: তিনটা `(Senior)`, একটা `(Lead)`, একটা `(Staff)` — চিহ্ন বুলেটের শেষে। ০০.০১-এ চারটা, সব Senior। মোট ১০৪।
  - নতুন তিনটা অধ্যায়: ০৩.০৩ Speaking English, ০৩.০৬ Mentoring, ০৪.০৩ Cross-team work। এগুলো বসাতে Writing, Feedback, Conflict, Teamwork, Customer Service আর Leadership-এর নম্বর সরেছে।
  - অধ্যায়ের ভেতরের relative `.md` লিংক `app/lib/guide.ts` রেন্ডারের আগে `/doc/<স্তর>-<ডক>/`-এ বদলায়।
- **`docs/` = plan** — `00-rules.md` আর ৪টা ব্লক, স্তরের ক্রমে; `00-start`-এর ৪টা drill ব্লক ১-এ। দিনের শিরোনাম = drill-এর bold শিরোনাম হুবহু (শেষের "।" বাদে), ১০৪টা drill গাইডের ক্রমেই। দিন ০৯১-এ দিন ০০১-এর baseline আবার — দ্বিতীয় কাজ হিসেবে। দিনের নম্বর পরপর না হলে build ভাঙে; ফাইলে তারিখ নেই, "আজ" = ক্যালেন্ডারের তারিখ। `docs/plans/` পুরনো দুই প্ল্যান — `plan.ts` শুধু `^\d\d-.*\.md` নেয়।
- কাজে `(ডক ০৩.০১)` = `guide/`-এর স্তর.অধ্যায়; না মিললে **build ভাঙে**। গাইডের drill বদলালে plan-এর দিনও বদলান — শিরোনাম না মিললে build ভাঙে না, কিন্তু দুটো আলাদা কথা বলবে।
- **একটা drill = একটা দিন, "আজ একবার" মাপে** (ব্যবহারকারী, ২০২৬-১০-১৭)। কাজের লেখা drill আর তার অধ্যায় থেকে — নতুন দাবি নয়। কাজের শেষে `পূর্ণ মাপে:` (কয়েক দিনের drill) বা `সুযোগ এলে:` (ঘটনা-নির্ভর) = গাইডের পুরো drill, টিকের শর্ত নয়।
- **আজকের অংশ** — Senior আর ঘটনা হাতে থাকলে আজই; Senior কিন্তু ঘটনার অপেক্ষায় — শেষবারের ঘটনা খাতায় আর পরের বারের বাক্য; Lead আর Staff — ছোট রূপ বা প্রস্তুতি, পদ ছাড়াই করা যায় এমন। ইংরেজির drill-এ আসল ইংরেজি আলাপ না থাকলে ফোনে রেকর্ড।
- **🔁 মিশ্র, শুধু Senior-এর drill-এ** — ঝালাই ১/৪ = আবার করা, ২/৪–৪/৪ = নাম দেখে, গাইড না খুলে, ইংরেজিতে মুখে দুই বাক্য। নির্দেশটা `app/components/ReviewList.tsx`-এর `reviewHow()` আর `Hint`-এ — chassis থেকে একমাত্র আচরণের বদল। Lead আর Staff-এর দিনে আর শুরুর তিনটা একবারের কাজে 🔁 নেই — মোট ৬১টা কাজে আছে।
- ⚑ দিন (০২৫, ০৪১, ০৮২, ১০৮): গাইড না খুলে, ইংরেজিতে, জোরে, ২ মিনিটে, রেকর্ড করে — ব্লকের অধ্যায়গুলোর তিনটা মূল নিয়ম আর নিজের একটা ঘটনা। 🔁 নেই।
- **সময় ⏳** — দিনের ১০′ সপ্তাহে ৭ ঘণ্টার ভেতরে না বাইরে, আর বাকি learning সাইটের সাথে একসাথে না পরপর — ব্যবহারকারীর উত্তর বাকি। `suggestedStart` তাই `null`; কোনো plan-এর ঘর থেকে সময় কাটবেন না। `brainstorming/soft-technical-and-ai-skill.md` soft skill-এর সাইটকে "ফাঁদ" বলে — অমিলটা `brainstorming/thought-map.md`-এ ⏳; নিজে মীমাংসা করবেন না।
- 🧠 নাম → `app/lib/principles.ts`, `postgres_learning`-এর কপি (`learning_to_learn`-এর ৫৭টা বিষয়, লিংক ঐ সাইটের লাইভ Pages-এ)। ওখানে বদলালে এখানেও।
- Progress চার key (`ssl:v1:start`, `task`, `check`, `review`) — একমাত্র `app/hooks/useProgress.ts` দিয়ে; পঞ্চম key `ssl:v1:meta` শুধু sync-এর timestamp। prefix `ssl` পুরনো সাইটের; পুরনো `ssl:v1:read` আর `ssl:v1:drill` কোড পড়ে না, sync-ও করে না। কাজের লেখা বদলালে ঐ কাজের টিক হারায় (id = দিন + লেখার hash)।
- **Cross-device sync** — বাকি সাইটের মতোই: `app/lib/supabase.ts`, `app/hooks/useSync(Key).ts`, `app/components/SyncSettings.tsx`, `app/sync/page.tsx` chassis থেকে হুবহু, নিজে থেকে বদলাবেন না। `site_prefix` = `SITE.storagePrefix` = `ssl`। `deploy.yml` `postgres_learning` থেকে; env নাম `NEXT_PUBLIC_SUPABASE_*` — বদলালে sync চুপচাপ মরে যাবে। লাইভ ২০২৬-১০-১৭ — deployed chunk-এর Supabase config `learning_to_learn`-এর সাথে মেলানো, আর দুই device-এর push/pull একটা ফেলে-দেওয়া key দিয়ে পাশ।
- `app/lib/plan.ts` আর `app/lib/guide.ts` server-only।
- **Theme contract অলঙ্ঘনীয়**, সাইট **dark-only**। যাচাই: `rg -n "rounded-|shadow-|text-zinc|bg-zinc|uppercase|font-bold|dark:" app/components app/page.tsx` — আউটপুট খালি।

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
