"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProgressReadout from "./ProgressReadout";
import { useMounted, useProgress } from "../hooks/useProgress";

export type HomeDoc = {
  route: string;
  title: string;
};

export type HomeGroup = {
  id: string;
  label: string;
  /** স্তরটা কী শেখায়, এক লাইনে */
  blurb: string;
  items: HomeDoc[];
};

/**
 * হোমপেজ ভূমিকার জন্য, হিসাবের জন্য নয়।
 *
 * প্রথম দিনের পাঠক চায় "এটা কী, কোথা থেকে শুরু"; তিন মাসের পাঠক চায় "কী বাকি"।
 * দ্বিতীয়টা `/progress`-এ গেছে, তাই এখানে শুধু একটাই readout — বাকি জায়গা
 * রোডম্যাপটা বোঝানোর জন্য।
 */
export default function Home({ groups }: { groups: HomeGroup[] }) {
  const mounted = useMounted();
  const { readCount } = useProgress();

  const allRoutes = groups.flatMap((group) => group.items.map((doc) => doc.route));
  const read = mounted ? readCount(allRoutes) : 0;
  const percent = allRoutes.length > 0 ? Math.round((read / allRoutes.length) * 100) : 0;

  const firstDoc = groups[0]?.items[0];

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 md:px-10 md:py-12">
      <h1 className="t-title text-xl md:text-2xl">সফট স্কিল — চার স্তরের রোডম্যাপ</h1>
      <p className="t-body mt-3 text-sm">
        সফট স্কিল মানে মানুষ ও নিজের সাথে কাজ করার আচরণগত দক্ষতা। এখানে সেগুলো সাজানো
        নির্ভরতার ক্রমে — নিচের স্তর না পারলে উপরের স্তর কাজ করে না। প্রতিটি অধ্যায় শেষ হয়
        সুনির্দিষ্ট অনুশীলন দিয়ে, কারণ পড়ে জানা আর প্রয়োগ করতে পারা এক জিনিস নয়।
      </p>

      <section className="surface-panel mt-6 p-4 md:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="t-label">সার্বিক অগ্রগতি</span>
          <span className="t-mono t-accent text-xs" suppressHydrationWarning>
            {read}/{allRoutes.length} ({percent}%)
          </span>
        </div>
        <div className="mt-3">
          <ProgressReadout percent={percent} className="h-2 w-full" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {firstDoc && (
            <Link href={firstDoc.route} className="control control--primary px-3 py-2 text-xs">
              শুরু করুন
              <ArrowRight size={13} />
            </Link>
          )}
          <Link href="/progress/" className="control px-3 py-2 text-xs">
            বিস্তারিত হিসাব
          </Link>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-4">
        {groups.map((group) => (
          <section key={group.id} className="surface-panel p-4 md:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="t-title text-sm">{group.label}</h2>
              <span className="chip shrink-0">{group.items.length}</span>
            </div>
            <p className="t-caption mt-1.5">{group.blurb}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((doc) => (
                <Link key={doc.route} href={doc.route} className="chip">
                  {doc.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
