# Implementation Plan — dsa_prep-এর Shell, TOC ও Progress

তারিখ: ২০২৬-০৯-০৫
পূর্বসূরি: [plan-soft-skill-learning.md](plan-soft-skill-learning.md)

## আমরা কী তৈরি করছি

`soft_skill_learning`-এর navigation ও progress স্তরটাকে `dsa_prep`-এর কাঠামোয় নিয়ে আসা — তিনটি অংশে:

1. **Shell** — একটা chassis কম্পোনেন্ট যা Navbar, rail (ডেস্কটপ sidebar), drawer (মোবাইল) আর কীবোর্ড শর্টকাট একসাথে ধরে। sidebar-এ progress gauge, স্তরভিত্তিক `chip` গণনা, `seam-l` ইন্ডেন্ট, আর দুই-স্তরের search।
2. **TOC** — ডক পাতার ডানদিকে "এই পাতায়" কলাম, ডকের `##`/`###` heading থেকে তৈরি, IntersectionObserver দিয়ে scroll-spy।
3. **`/progress` route** — আলাদা পাতা, ৫টি filter দিয়ে "কী বাকি" দেখার জন্য। হোমপেজ হালকা হয়ে ভূমিকা + সামগ্রিক gauge-এ ফিরে যাবে।

Theme Contract, dark-only, docs কাঠামো — সব অপরিবর্তিত ([AGENTS.md](../../AGENTS.md) দেখুন)।

## যে পরিভাষাগুলোতে আমরা সম্মত হয়েছি

- **"sidebar"**: `dsa_prep`-এর পুরো ফিচার-সেট, শুধু চেহারা নয় — ভেতরে progress gauge, স্তরের পাশে `chip` (`পড়া/মোট`), প্রতিটি ডকের পাশে `(drill x/y)`, `seam-l` ইন্ডেন্ট। breakpoint `md:` থেকে বদলে **`lg:`**।
- **"toc"**: ডানদিকের সূচিপত্র কলাম, ডকের markdown `##`/`###` heading থেকে তৈরি (`dsa_prep`-এর fixed সেকশন থেকে নয়, কারণ আমাদের কনটেন্ট markdown), scroll-spy সহ, `xl:` থেকে দৃশ্যমান।
- **"progress"**: শুধু readout নয় — আলাদা `/progress` route, filter সহ।
- **"design will look like"**: চেহারা নকল নয়, **কাঠামো এক** — একই role class, একই breakpoint, একই আচরণ। শব্দ ও কনটেন্ট নিজস্ব।

## নেওয়া সিদ্ধান্তসমূহ

### সিদ্ধান্ত ১ — আলাদা `/progress` route, export/import ছাড়া

হোমপেজ এখন দুটো কাজ একসাথে করছে — ভূমিকা বোঝানো আর হিসাব দেখানো। **প্রথম দিনের পাঠক আর তিন মাসের পাঠকের দরকার আলাদা**: নতুন পাঠক চায় "এটা কী, কোথা থেকে শুরু", পুরনো পাঠক চায় "কী বাকি"। এক পাতায় দুটো রাখলে দুটোই দুর্বল হয়।

`/progress`-এর ৫টি filter — `dsa_prep`-এর filter chip আমাদের ডেটায় অনুবাদ করে:

| Filter | মানে |
|---|---|
| সব অধ্যায় | ১৯টি |
| পড়া হয়নি | `read` flag নেই |
| **drill বাকি** | পড়া হয়েছে কিন্তু drill অসম্পূর্ণ |
| drill শুরুই হয়নি | ০/n |
| সম্পূর্ণ | পড়া + সব drill |

তৃতীয়টাই সবচেয়ে দরকারি — সাইটের পুরো যুক্তিই হলো **পড়া ≠ পারা**, আর এই filter ঠিক সেই ফাঁকটা দেখায়।

**export/import ইচ্ছাকৃত বাদ।** `dsa_prep`-এ শত শত problem-এর কয়েক মাসের ইতিহাস, হারালে সত্যিই ক্ষতি। আমাদের ১৯টি ডক + ৮৯টি drill, আর drill বারবার করার জিনিস। JSON schema + file input + "replace not merge" — অনেক কোড, কম মূল্য। পরে যোগ করা সহজ, আগেই বানিয়ে ফেললে সরানো কঠিন।

### সিদ্ধান্ত ২ — search: টাইটেল + heading, দুই গ্রুপে ফল

```
অধ্যায় (১)   → ডকের টাইটেল ম্যাচ, ডকে নিয়ে যায়
বিষয় (৩)     → heading ম্যাচ, সরাসরি `#anchor`-এ নামায়
```

full-text নয়। কারণ দুটো:

- ১৯টি ডকের পুরো লেখা (~৮০KB বাংলা) client bundle-এ পাঠাতে হতো, তারপর snippet ও ranking লিখতে হতো — নইলে "এই সপ্তাহে" লিখলে ১৫টি ডকই ম্যাচ করে, যা কোনো কাজে আসে না।
- **TOC-এর সাথে একই ভিত্তি লাগছে** — heading extractor + anchor id। একবার লিখলে TOC আর search দুটোই ওটার উপর দাঁড়ায়। full-text মানে দুটো সমান্তরাল index।

### সিদ্ধান্ত ৩ — Shell layout-এ, page-এ নয়

`dsa_prep`-এর মতো chassis-টা `layout.tsx`-এ বসবে, যাতে `/` থেকে `/progress`-এ গেলে navigation কলাম একটাই থাকে, দুটো কপি আলাদা হয়ে যায় না। `getNav()` server-only, তাই layout data এনে client `Shell`-এ props হিসেবে পাঠাবে।

## অনুমানসমূহ (Assumptions)

- **Breakpoint**: rail `lg:` (১০২৪px), TOC `xl:` (১২৮০px), Navbar `lg:hidden`। reading column `max-w-3xl` থাকবে — তিন কলাম একসাথে শুধু `xl:`-এ।
- **TOC-এ `##` ও `###` দুটোই**, `###` nested (`dsa_prep`-এর `nested` স্টাইলে)। ২টির কম entry হলে TOC রেন্ডার হবে না — একটা entry সূচিপত্র নয়।
- **Heading anchor** = `slugify(heading text)`, বিদ্যমান `app/lib/slug.ts` দিয়ে (বাংলা ইউনিকোড রেঞ্জ ইতিমধ্যে সাপোর্টেড)।
- **collapse key** `ssl_nav_collapsed` — `dsa_prep`-এর `dsa_nav_collapsed`-এর সমতুল্য।
- progress key স্কিমা (`ssl:v1:read`, `ssl:v1:drill`) অপরিবর্তিত — কোনো migration নেই।
- `dsa_prep`-এর `Navbar`-এ 📚 ইমোজি আছে; আমাদেরটায় সমতুল্য একটা থাকবে, কিন্তু ইমোজি নির্বাচন কোড লেখার সময়ের ছোট সিদ্ধান্ত।

## যেভাবে এটি তৈরি করতে হবে

1. **role class যোগ** — `app/globals.css`-এ `.seam-l`, `.topic-group`, `.animate-slide-in-left` + `slide-in-left` keyframe। `dsa_prep`-এর সংজ্ঞা থেকে, সব মান `--t-*` থেকে। কোনো hex নয়।
2. **Heading extractor** — `app/lib/content.ts`-এ `extractHeadings(markdown)` → `{ id, text, level }[]`; `parseDoc`-এ যোগ। সাথে `getHeadingIndex()` → search-এর জন্য সমতল তালিকা (`docRoute`, `docTitle`, `headingId`, `headingText`)।
3. **Anchor id** — `Markdown.tsx`-এ `h2`/`h3` রেন্ডারারে `id={slugify(text)}` বসানো, যাতে TOC ও search-এর লিংক কাজ করে।
4. **`ProgressReadout.tsx`** — ছোট gauge কম্পোনেন্ট (`role="progressbar"` + aria সহ), Navbar ও Sidebar দুটোতেই ব্যবহৃত।
5. **`Navbar.tsx`** — `lg:hidden`, hamburger + ব্র্যান্ড + `surface-raised` progress chip (`পড়া/মোট (%)` + gauge)।
6. **`Sidebar.tsx` পুনর্লিখন** — ব্র্যান্ড + Progress লিংক + `ProgressReadout` + search (বাঁয়ে আইকন, ডানে clear/`/` হিন্ট) + স্তর গ্রুপ (`topic-group`, পাশে `chip` = পড়া/মোট) + `seam-l` ইন্ডেন্টে ডকের তালিকা, প্রতিটির পাশে `(drill x/y)` + ✓। search সক্রিয় হলে গ্রুপিং বাদ দিয়ে **দুই ফ্ল্যাট গ্রুপ** (অধ্যায় / বিষয়) + empty state।
7. **`Shell.tsx`** — chassis: `Navbar` + collapsed rail + `lg:` aside + মোবাইল drawer (`overlay` + `animate-slide-in-left`) + `/` ও `Ctrl+K` শর্টকাট + drawer খোলা থাকলে body scroll lock। collapse `ssl_nav_collapsed`-এ।
8. **`layout.tsx`** — `Sidebar`-এর বদলে `Shell`; `getNav()` ও heading index server-এ এনে props-এ পাঠানো।
9. **`DocToc.tsx`** — `hidden xl:block w-64`, sticky, IntersectionObserver scroll-spy, `aria-current`, ক্লিকে smooth scroll।
10. **`[...slug]/page.tsx`** — article-এর পাশে `DocToc` বসানো (flex, article `max-w-3xl`)।
11. **`/progress` route** — `page.tsx` (server: ডক + drillCount + heading তালিকা) + `ProgressClient.tsx` (client: ৫টি filter chip, তালিকা, প্রতিটি আইটেমে পড়া-অবস্থা ও `drill x/y`, ক্লিকে ডকে যায়)।
12. **হোমপেজ হালকা করা** — `Home.tsx` থেকে বিস্তারিত তালিকা সরিয়ে ভূমিকা + চার স্তরের কার্ড + একটি সামগ্রিক gauge + "বিস্তারিত হিসাব" বোতাম (`/progress`)।
13. **যাচাই** — Theme Contract grep খালি; `GITHUB_ACTIONS=true npm run build` সফল; ২০টি route (১৯ ডক + হোম + progress); dev-এ TOC scroll-spy, search দুই গ্রুপ, drawer, collapse persist।
14. **ডকুমেন্টেশন** — `README.md` ও `AGENTS.md`-এ নতুন route, Shell কাঠামো ও search/TOC-এর ভিত্তি (heading index) যোগ।
