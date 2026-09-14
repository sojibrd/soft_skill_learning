# soft_skill_learning

সফট স্কিল শেখার বাংলা রোডম্যাপ — যোগাযোগ, টিমওয়ার্ক আর নেতৃত্ব। ১৯টি অধ্যায়, চারটি নির্ভরতা-ভিত্তিক স্তরে।

**লাইভ:** https://sojibrd.github.io/soft_skill_learning/

## Functional Requirement

- **ক্রমিক রোডম্যাপ:** ১৯টা অধ্যায় নির্ভরতার ক্রমে পড়া যায় — নিজের সাথে → চিন্তার সাথে → একজন মানুষের সাথে → অনেক মানুষের সাথে।
- **প্রতি অধ্যায়ে drill:** `## অনুশীলন`-এর প্রতিটা বুলেট একটা checkbox।
- **"পড়া হয়েছে" টগল:** প্রতিটা ডকের নিচে; nav-এ ✓, হোমপেজে স্তরভিত্তিক gauge।
- **অগ্রগতির পাতা (`/progress`):** ৫টা filter — সব অধ্যায় · পড়া হয়নি · **drill বাকি** · drill শুরুই হয়নি · সম্পূর্ণ। তৃতীয়টাই মূল, কারণ সাইটের যুক্তি *পড়া ≠ পারা*।
- **Rail আর search:** `/` বা `Ctrl+K`-এ ফোকাস। ফল দুই গ্রুপে — **অধ্যায়** (শিরোনাম মেলে) আর **বিষয়** (heading মেলে, সরাসরি `#anchor`-এ নামায়)। full-text নয়।
- **ডানে TOC:** "এই পাতায়", scroll-spy সহ।

## Non-Functional Requirement

- **route ও nav স্ক্যান থেকে স্বয়ংক্রিয়।** scanner শুধু `^\d\d-` ফোল্ডার নেয়, তাই `docs/plans/` নিজে থেকেই বাদ।
- **Progress শুধু `localStorage`-এ** (ডিভাইস-বদ্ধ, কোথাও পাঠানো হয় না), একমাত্র `app/hooks/useProgress.ts` দিয়ে। Export/import ইচ্ছাকৃতভাবে নেই।
- **`app/lib/content.ts` server-only।** `page.tsx` পাতলা — data এনে কম্পোনেন্টে পাঠায়।
- **Shell `layout.tsx`-এ, page-এ নয়** — route বদলালেও navigation কলাম একটাই থাকে।
- **Breakpoint:** rail `lg:`, TOC `xl:`, Navbar `lg:hidden`। rail ভাঁজের অবস্থা `ssl_nav_collapsed`-এ।
- **Theme contract অলঙ্ঘনীয়, সাইট dark-only** (নিচে বিস্তারিত)।
- **স্ট্যাক:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, react-markdown। Static export → GitHub Pages।

## ডক ইনডেক্স

### শুরু — `docs/00-start/`

| ফাইল | Gist |
|---|---|
| [01-what-is-soft-skill.md](docs/00-start/01-what-is-soft-skill.md) | Soft skill = মানুষ ও নিজের সাথে কাজ করার আচরণগত দক্ষতা, যা অনুশীলনে বাড়ে কিন্তু certificate দিয়ে প্রমাণ হয় না; hard skill-এর সাথে পার্থক্য — "soft" মানে সহজ নয় |
| [02-how-to-use-this-site.md](docs/00-start/02-how-to-use-this-site.md) | এটা roadmap, encyclopedia নয়: নম্বরই পড়ার ক্রম, কারণ প্রতিটা স্তর আগেরটার উপর দাঁড়ানো |

### ১. নিজের সাথে — `docs/01-self/`

| ফাইল | Gist |
|---|---|
| [01-self-awareness.md](docs/01-self/01-self-awareness.md) | নিজের আবেগ, প্রবণতা ও আচরণ **ঘটার সময়ই** দেখা; internal বনাম external self-awareness |
| [02-emotional-intelligence.md](docs/01-self/02-emotional-intelligence.md) | নিজের ও অন্যের আবেগ চিনে চিন্তা-আচরণ পরিচালনা; নির্ভরতার ক্রমে চার অংশ |
| [03-adaptability.md](docs/01-self/03-adaptability.md) | পরিস্থিতি বদলালে কার্যকারিতা না হারিয়ে পরিকল্পনা বা মত বদলানো; cognitive flexibility সহ তিন ক্ষমতা |
| [04-time-management.md](docs/01-self/04-time-management.md) | সময় নয়, **মনোযোগ ও প্রতিশ্রুতি** পরিচালনা — অগ্রাধিকার বাছাই আর "না" বলা |

### ২. চিন্তার সাথে — `docs/02-thinking/`

| ফাইল | Gist |
|---|---|
| [01-critical-thinking.md](docs/02-thinking/01-critical-thinking.md) | দাবির যুক্তি, প্রমাণ ও অনুমান আলাদা করে যাচাই — নিজের চিন্তার উপরও; উদ্দেশ্য দাবি ভাঙা নয়, ওজন মাপা |
| [02-problem-solving.md](docs/02-thinking/02-problem-solving.md) | অবাঞ্ছিত থেকে কাঙ্ক্ষিত অবস্থায় যাওয়ার পথ — সংজ্ঞায়ন, নির্ণয়, সমাধান |
| [03-decision-making.md](docs/02-thinking/03-decision-making.md) | অসম্পূর্ণ তথ্যে পথ বেছে দায়িত্ব নেওয়া; ভালো সিদ্ধান্ত ≠ ভালো ফলাফল |

### ৩. একজন মানুষের সাথে — `docs/03-interpersonal/`

| ফাইল | Gist |
|---|---|
| [01-listening.md](docs/03-interpersonal/01-listening.md) | উত্তর দিতে নয়, **বুঝতে** শোনা — সব যোগাযোগের ভিত্তি |
| [02-communication.md](docs/03-interpersonal/02-communication.md) | মাপকাঠি আপনি কী বলেছেন নয়, সে কী বুঝেছে; বেশিরভাগ যোগাযোগ-সমস্যা আসলে চিন্তার অস্পষ্টতা |
| [03-writing.md](docs/03-interpersonal/03-writing.md) | কাজের লেখা (PR, RFC, স্ট্যাটাস, incident report, email); লেখককে ছাড়াই লেখাকে একা দাঁড়াতে হয় |
| [04-feedback.md](docs/03-interpersonal/04-feedback.md) | নির্দিষ্ট **আচরণ** ও তার প্রভাব নিয়ে তথ্য দেওয়া-নেওয়া, ব্যক্তিত্ব নিয়ে নয় |
| [05-conflict.md](docs/03-interpersonal/05-conflict.md) | সম্পর্ক না ভেঙে সংঘর্ষ মেটানো; মতবিরোধ নয়, মতবিরোধ এড়ানোই সমস্যা; দুই ধরনের conflict |
| [06-teamwork.md](docs/03-interpersonal/06-teamwork.md) | ব্যক্তিগত আউটপুট নয়, দলের ফলাফল বাড়ানো; সবচেয়ে বড় নির্ধারক psychological safety |

### ৪. অনেক মানুষের সাথে — `docs/04-influence/`

| ফাইল | Gist |
|---|---|
| [01-presentation.md](docs/04-influence/01-presentation.md) | দলের সামনে এমনভাবে বার্তা দেওয়া যাতে মনে রাখে ও কাজ করে; ডকুমেন্টে যা হয় না তা ঘটাতেই মিটিং |
| [02-persuasion-negotiation.md](docs/04-influence/02-persuasion-negotiation.md) | ক্ষমতা ছাড়া রাজি করানো (persuasion) আর দুই পক্ষের মেনে নেওয়ার মতো বোঝাপড়া (negotiation) |
| [03-customer-service.md](docs/04-influence/03-customer-service.md) | আপনার তৈরি জিনিসে আটকে যাওয়া মানুষের সমস্যা সামলানো — API-র টিম, লাইব্রেরির ইউজার, issue খোলা মানুষও |
| [04-leadership.md](docs/04-influence/04-leadership.md) | দলকে একা-অসম্ভব ফলাফলে নেওয়া ও তাদের বড় করা; আলাদা স্কিল নয়, আগের ষোলোটার যোগফল |

### প্ল্যান — `docs/plans/` (সাইটে যায় না)

| ফাইল | Gist |
|---|---|
| [plan-soft-skill-learning.md](docs/plans/plan-soft-skill-learning.md) | ২০২৬-০৯-০৫ · প্রথম প্ল্যান: ১৯ ডক, ৪ স্তর, ৫-সেকশন টেমপ্লেট, `localStorage` progress, পরিভাষা ও সিদ্ধান্ত |
| [plan-dsa-prep-shell.md](docs/plans/plan-dsa-prep-shell.md) | ২০২৬-০৯-০৫ · `dsa_prep`-এর গড়নে Shell (rail + drawer + search), TOC আর `/progress` route আনা |

### এজেন্ট ফাইল

| ফাইল | Gist |
|---|---|
| [AGENTS.md](AGENTS.md) | Invariant, content নিয়ম, architecture (server-only content, `useProgress`, Shell layout-এ, TOC-search একই ভিত্তি), Theme Contract ও তার যাচাইয়ের grep, Next.js 16 সতর্কতা |
| [CLAUDE.md](CLAUDE.md) | `AGENTS.md` পড়ে কঠোরভাবে মানার নির্দেশ |

## প্রজেক্ট-নির্দিষ্ট নিয়ম

### কাঠামো

অধ্যায়ের ক্রম নির্ভরতার — নিচের স্তর না পারলে উপরের স্তর কাজ করে না।

| স্তর | ফোল্ডার | অধ্যায় |
|---|---|---|
| শুরু | `docs/00-start/` | সফট স্কিল কী, সাইট কীভাবে ব্যবহার করবেন |
| ১. নিজের সাথে | `docs/01-self/` | Self-awareness, Emotional Intelligence, Adaptability, Time Management |
| ২. চিন্তার সাথে | `docs/02-thinking/` | Critical Thinking, Problem Solving, Decision Making |
| ৩. একজন মানুষের সাথে | `docs/03-interpersonal/` | Listening, Communication, Writing, Feedback, Conflict, Teamwork |
| ৪. অনেক মানুষের সাথে | `docs/04-influence/` | Presentation, Persuasion/Negotiation, Customer Service, Leadership |

### ডক লেখার নিয়ম

প্রতিটা স্কিল-ডক একই পাঁচ সেকশন মানে, এই ক্রমে:

```
# শিরোনাম
## সংজ্ঞা          — স্কিলটা আসলে কী
## কেন এটা কঠিন    — যে ভুলগুলো নিজে ধরা যায় না
## কীভাবে কাজ করে   — মূল model বা কাঠামো
## অনুশীলন          — ৩–৫টি drill, প্রতিটি আলাদা `- ` বুলেট
## মূল নিয়ম         — ৫–৮টি এক-লাইনের imperative নিয়ম
```

- ব্যাখ্যা বাংলায়, technical term ইংরেজিতে।
- `## অনুশীলন` — **হুবহু** এই heading। prefix-match নয়, নইলে `## অনুশীলন কীভাবে করবেন` drill হিসেবে ধরা পড়ত।
- নতুন অধ্যায় = স্তর-ফোল্ডারে পরের নম্বরের `.md`।
- নতুন স্তর = `docs/`-এ `<nn>-<নাম>/` ফোল্ডার, আর `app/lib/content.ts`-এর `GROUP_LABELS`-এ একটা লেবেল।

### Progress key

`ssl:v1:read` (ডক-লেভেল) আর `ssl:v1:drill` (drill-লেভেল)। স্কিমা বদলালে `v1` বাড়ান।

### TOC, search আর anchor

- TOC আর search একই ভিত্তির উপর — `content.ts`-এর `extractHeadings()`।
- anchor id = `slugify(heading text)`, আর `Markdown.tsx`-এর `h2`/`h3` রেন্ডারার হুবহু একই নিয়মে id বসায়। দুটো আলাদা হলে লিংক নীরবে ভাঙে।
- `## অনুশীলন` সেকশন `DrillList` আলাদা রেন্ডার করে, তাই তার anchor id সেখানে **হাতে** বসানো।

### Theme Contract

চেহারার সব সিদ্ধান্ত CSS-এ — `system_design`-এর dark-only *control-room* কনট্র্যাক্ট, ক্যানভাসের role বাদে।

1. কম্পোনেন্টে কোনো ভিজ্যুয়াল ক্লাস নয় — রঙ, `rounded-*`, `shadow-*`, `border-2`, `uppercase`, `tracking-*`, `font-bold` কোনোটাই না। সব role class-এ (`surface-panel`, `t-title`, `control`, `chip`, `row`, `gauge`)।
2. Tailwind শুধু লেআউটের জন্য।
3. অবস্থা যায় `aria-pressed` / `aria-current` / `data-state`-এ; চেহারা ঠিক করে CSS।
4. সাইট dark-only — `dark:` variant বা `.dark` ক্লাস নয়।
5. একমাত্র ব্যতিক্রম `.doc-prose` — markdown-এর raw element, সব মান `--t-doc-*` থেকে।
6. থিম বদলানোর একমাত্র জায়গা: `app/globals.css`-এর উপরের `@import "./themes/control-room.css";`

## চালানো

```bash
npm install
npm run dev                          # http://localhost:3000
GITHUB_ACTIONS=true npm run build    # CI-এর মতো build (basePath সহ)
```

`master`-এ push হলে `.github/workflows/deploy.yml` চলে।
