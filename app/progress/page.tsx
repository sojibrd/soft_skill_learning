import type { Metadata } from "next";
import ProgressClient, { type ProgressDoc } from "./ProgressClient";
import { getNav, parseDoc, readDoc } from "../lib/content";

export const metadata: Metadata = {
  title: "অগ্রগতি",
  description: "কোন অধ্যায় পড়া হয়েছে, কোন অনুশীলন বাকি — এক জায়গায়।",
};

export default function ProgressPage() {
  const docs: ProgressDoc[] = getNav().flatMap((group) =>
    group.items.map((doc) => ({
      route: doc.route,
      title: doc.title,
      groupLabel: group.label,
      drillTotal: parseDoc(readDoc(doc)).drills.length,
    })),
  );

  return <ProgressClient docs={docs} />;
}
