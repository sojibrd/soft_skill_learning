# soft_skill_learning

সফট স্কিলের ১০৪টা drill, ১০৮ দিনে। দিনে একটা drill, ১০′ টেবিলে: drill-টা গাইডে পড়া, আজকের অংশ ঠিক করা, দিনের ভেতরে আসল কথোপকথনে বা খাতায় করা, আর পরে খাতায় এক লাইন। চার স্তর, নির্ভরতার ক্রমে — নিজের সাথে → চিন্তার সাথে → একজন মানুষের সাথে → অনেক মানুষের সাথে; প্রতিটা ব্লকের শেষে ⚑ — মূল নিয়ম ইংরেজিতে মুখে।

গাইডের ২২টা অধ্যায় এই সাইটের নিজের লেখা, ২০২৬-১০-১৭-এ "পরের স্তরে": গভীর model, রিমোট আর দ্বিতীয় ভাষা (ইংরেজি), আর Senior থেকে Staff পর্যন্ত একই স্কিলের মই — প্রতিটার শেষে যাচাই করা উৎস ([guide/](guide/))। গড়ন [behavioural_interview_local_company](https://sojibrd.github.io/behavioural_interview_local_company/)-এর মতো; তার আগে সাইটটা ছিল শুধু রোডম্যাপ — ১৯টা অধ্যায় আর drill-এর checkbox।

**লাইভ:** https://sojibrd.github.io/soft_skill_learning/

## Functional Requirement

- **আজ (`/`):** প্রথমবার খুললে শুরুর তারিখ জিজ্ঞেস করে। তারপর দেখায় ক্যালেন্ডারের আজকের দিনটা, এই ক্রমে: জমে থাকা ⚑ → আজকের ঝালাই → আজকের দিন।
- **Rail:** সব পাতায় বাঁয়ে rail, মোবাইলে drawer — পাতার লিংক, plan-এর gauge আর ৪টা ব্লক।
- **দিন (`/day/<nnn>/`) · ব্লক (`/block/<slug>/`):** দিনের কাজ আর দিন বা ব্লক শেষের হ্যাঁ/না।
- **কাজ:** drill-এর আজকের অংশ; শেষে `পূর্ণ মাপে:` বা `সুযোগ এলে:` — পুরো drill, টিকের শর্ত নয়। নিচে অধ্যায়ের chip।
- **ডক (`/docs/`, `/doc/<স্তর>-<ডক>/`):** ২২টা অধ্যায় চার স্তরে, পাশে plan-এর কয়টা কাজে আসে। অধ্যায়ের পাতায় আগে কোন দিনের কোন কাজ, তারপর পুরো লেখা।
- **ঝালাই (`/review/`):** প্রতিটা 🔁 কাজ — শুধু Senior drill-এ, ৬১টা — টিকের দিন থেকে ১/৩/৭/২১ দিন পরে ফেরে; ১/৪-এ আবার করা, বাকি তিনটায় ইংরেজিতে মুখে।
- **নিয়ম (`/rules/`):** `docs/00-rules.md` হুবহু।
- **🧠 chip:** `learning_to_learn`-এর ৫৭টা বিষয়। chip চাপলে এক লাইনে কারণ, সাথে ঐ সাইটের লিংক।
- **Sync (`/sync/`):** একই sync key বসালে অন্য device-এ progress নেমে আসে।

## Non-Functional Requirement

- **সত্যের উৎস `docs/` আর `guide/`।** কোডে কোনো দিন, কাজ বা drill হার্ডকোড নেই। কাজের `(ডক ০৩.০১)` যদি `guide/`-এ না মেলে, **build ভাঙে।**
- **গাইডের দাবি যাচাই করা।** সংখ্যা আর গবেষণার দাবি শুধু web-এ মেলানো উৎস থেকে, প্রতিটা অধ্যায়ের `## উৎস`-এ। অধ্যায়ের ভেতরের relative `.md` লিংক রেন্ডারের আগে `/doc/<স্তর>-<ডক>/`-এ বদলায় (`app/lib/guide.ts`), ফাইল নয়।
- **ফাইলে তারিখ নেই।** তারিখ = শুরুর তারিখ + (দিন − ১)। "আজ" মানে ক্যালেন্ডারের তারিখ, plan পেছায় না।
- **Static export → GitHub Pages।** নিজের backend নেই।
- **Progress `localStorage`-এ,** একমাত্র `app/hooks/useProgress.ts` দিয়ে; sync key থাকলে শেয়ার্ড Supabase-এ কপি যায়। নোটের ঘর নেই, ইচ্ছা করেই।
- **`app/lib/plan.ts` আর `app/lib/guide.ts` server-only।**
- **Theme contract অলঙ্ঘনীয়, সাইট dark-only।** chassis `behavioural_interview_local_company` থেকে।
- **স্ট্যাক:** Next.js 16, React 19, TypeScript, Tailwind v4, react-markdown, `@supabase/supabase-js`।

## ডক ইনডেক্স

### plan — `docs/`

| ফাইল | Gist |
|---|---|
| [docs/00-rules.md](docs/00-rules.md) | লক্ষ্য, সত্যের উৎস, চিহ্ন, "আজ", কখন বসবেন ⏳, ১০′-এর বসা, তিন রকম দিনের আজকের অংশ, মিশ্র ঝালাই (শুধু Senior), ⚑ দিন, যা করবেন না, দিন ১০৮-এর পরে |
| [docs/01-self.md](docs/01-self.md) | দিন ০০১–০২৫: ০০.০১-এর ৪ + স্তর ১-এর ২০ drill; ⚑ |
| [docs/02-thinking.md](docs/02-thinking.md) | দিন ০২৬–০৪১: স্তর ২-এর ১৫ drill; ⚑ |
| [docs/03-interpersonal.md](docs/03-interpersonal.md) | দিন ০৪২–০৮২: স্তর ৩-এর ৪০ drill; ⚑ |
| [docs/04-influence.md](docs/04-influence.md) | দিন ০৮৩–১০৮: স্তর ৪-এর ২৫ drill; দিন ০৯১-এ baseline আবার; ⚑ |

### অধ্যায় — `guide/`

| স্তর | ফোল্ডার | অধ্যায় |
|---|---|---|
| শুরু | `guide/00-start/` | সফট স্কিল কী, সাইট কীভাবে ব্যবহার করবেন |
| ১. নিজের সাথে | `guide/01-self/` | Self-awareness, Emotional Intelligence, Adaptability, Time Management |
| ২. চিন্তার সাথে | `guide/02-thinking/` | Critical Thinking, Problem Solving, Decision Making |
| ৩. একজন মানুষের সাথে | `guide/03-interpersonal/` | Listening, Communication, **Speaking English**, Writing, Feedback, **Mentoring**, Conflict, Teamwork |
| ৪. অনেক মানুষের সাথে | `guide/04-influence/` | Presentation, Persuasion ও Negotiation, **Cross-team work**, Customer Service, Leadership |

**মোটা** = ২০২৬-১০-১৭-এ নতুন। প্রতিটা স্কিল-অধ্যায় আট সেকশনে: `## সংজ্ঞা` → `## কেন এটা কঠিন` → `## কীভাবে কাজ করে` → `## রিমোট আর দ্বিতীয় ভাষায়` → `## Senior থেকে Staff` → `## অনুশীলন` → `## মূল নিয়ম` → `## উৎস`। drill = `## অনুশীলন`-এর একটা টপ-লেভেল `- **শিরোনাম।** … (Senior)` বুলেট — পাঁচটা, তিনটা Senior, একটা Lead, একটা Staff; plan-এর দিনের শিরোনাম = ঐ bold শিরোনাম, শেষের "।" বাদে।

### পুরনো প্ল্যান — `docs/plans/` (সাইটে যায় না)

| ফাইল | Gist |
|---|---|
| [plan-soft-skill-learning.md](docs/plans/plan-soft-skill-learning.md) | ২০২৬-০৯-০৫ · প্রথম প্ল্যান: ১৯ ডক, ৪ স্তর, ৫-সেকশন টেমপ্লেট, `localStorage` progress |
| [plan-dsa-prep-shell.md](docs/plans/plan-dsa-prep-shell.md) | ২০২৬-০৯-০৫ · `dsa_prep`-এর গড়নে Shell, TOC আর `/progress` — ২০২৬-১০-১৭-এ chassis বদলে সরানো |

## প্রজেক্ট-নির্দিষ্ট নিয়ম

### ব্লক ফাইলের ছাঁচ

- `# ব্লক ১ — নাম` — প্রথম H1। "— "-এর পরের অংশ rail-এ দেখায়।
- `*দিন ০০১–০২৫ · …*` — H1-এর নিচের italic লাইন।
- `> **ব্লক শেষে:** …` · `### দিন ০০৭ · শিরোনাম` · `- [ ] ১০′ …` · `> **দিন শেষে:** …`
- দিনের নম্বর সব ব্লক মিলিয়ে পরপর থাকতে হবে। না থাকলে build ভাঙে।
- কাজে `(ডক ০৩.০১)` = `guide/03-*/01-*.md`; chip হয়ে অধ্যায়ের পাতায় যায়। ⚑ দিনে কয়েকটা, `·` দিয়ে।
- `⚑` = মাইলফলক, `🔁` = ঝালাই হবে (শুধু Senior-এর drill-এ), শেষে `🧠 (নাম · নাম)`। 🧠 নাম `app/lib/principles.ts`-এ থাকা নামগুলো থেকে।

### Progress key

| key | মান |
|---|---|
| `ssl:v1:start` | শুরুর তারিখ `"YYYY-MM-DD"` |
| `ssl:v1:task` | কাজ শেষের তারিখ। id = দিন + কাজের **লেখা** থেকে hash — লেখা বদলালে টিক হারায় |
| `ssl:v1:check` | দিন শেষ (`d007`) ও ব্লক শেষ (`b1`)-এর হ্যাঁ/না |
| `ssl:v1:review` | 🔁 ঝালাইয়ের অবস্থা `{ base, step }` |
| `ssl:v1:meta` | sync-এর শেষ timestamp |

পুরনো সাইটের `ssl:v1:read` আর `ssl:v1:drill` browser-এ থেকে যেতে পারে; নতুন কোড পড়ে না, sync-ও করে না।

## চালানো

```bash
npm install
npm run dev                          # http://localhost:3000
GITHUB_ACTIONS=true npm run build    # CI-এর মতো build (basePath সহ) → out/
```

`master`-এ push হলে `.github/workflows/deploy.yml` চলে; build-এ repo secret `NEXT_PUBLIC_SUPABASE_URL` আর `NEXT_PUBLIC_SUPABASE_ANON_KEY` লাগে — না থাকলে build সফল হয়, কিন্তু sync চুপচাপ বন্ধ থাকে।
