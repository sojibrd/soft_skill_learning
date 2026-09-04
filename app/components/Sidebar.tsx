"use client";

import { useMemo, useState, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, PanelLeftClose, Search, X } from "lucide-react";
import type { HeadingIndexEntry, NavGroup } from "../lib/content";
import ProgressReadout from "./ProgressReadout";

export interface SidebarDocState {
  /** পড়া হয়েছে কি না */
  read: boolean;
  drillsDone: number;
  drillTotal: number;
}

interface SidebarProps {
  nav: NavGroup[];
  headingIndex: HeadingIndexEntry[];
  /** route → অবস্থা; Shell একবার হিসাব করে দুই mount-এ পাঠায় */
  docState: Record<string, SidebarDocState>;
  /** group id → পড়া/মোট */
  groupCounts: Record<string, { read: number; total: number }>;
  progressPercent: number;
  /** শুধু drawer-এ — তালিকার বেরোনোর পথ */
  onClose?: () => void;
  /** শুধু rail-এ — তালিকা ভাঁজ করার পথ */
  onCollapse?: () => void;
  /** rail-এর input, যাতে `/` ও Ctrl+K যেকোনো জায়গা থেকে পৌঁছাতে পারে */
  searchRef?: RefObject<HTMLInputElement | null>;
  /** hydration-এর আগে কোনো progress সংখ্যা দেখানো যাবে না */
  mounted: boolean;
}

function normalize(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/**
 * স্তর → অধ্যায় নেভিগেশন, সাথে search।
 *
 * একটাই কম্পোনেন্ট দুই জায়গায় বসে: `lg:` rail আর তার নিচের drawer। পার্থক্য
 * শুধু বেরোনোর পথে; দুটো আলাদা কম্পোনেন্ট মানে দুটো তালিকা সময়ের সাথে আলাদা
 * হয়ে যাওয়া।
 */
export default function Sidebar({
  nav,
  headingIndex,
  docState,
  groupCounts,
  progressPercent,
  onClose,
  onCollapse,
  searchRef,
  mounted,
}: SidebarProps) {
  const pathname = normalize(usePathname());
  const onProgressPage = pathname.endsWith("/progress");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const searching = query.length > 0;

  /* খোঁজার সময় স্তরের গ্রুপিং বাদ — নইলে খালি স্তরের হেডিং শূন্যের উপরে দাঁড়িয়ে
     থাকে, যেটা "এখানে কিছু নেই"-এর বদলে "ভাঙা" হিসেবে পড়ে। */
  const { docMatches, headingMatches } = useMemo(() => {
    if (!searching) return { docMatches: [], headingMatches: [] };

    const docs = nav
      .flatMap((group) => group.items.map((doc) => ({ ...doc, groupLabel: group.label })))
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.groupLabel.toLowerCase().includes(query),
      );

    const headings = headingIndex.filter((entry) =>
      entry.headingText.toLowerCase().includes(query),
    );

    return { docMatches: docs, headingMatches: headings };
  }, [nav, headingIndex, query, searching]);

  const noMatches = searching && docMatches.length === 0 && headingMatches.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="seam-b flex items-center justify-between gap-2 px-4 py-3 shrink-0">
        <Link href="/" onClick={onClose} className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0" aria-hidden>
            🧭
          </span>
          <span className="t-title text-sm truncate">সফট স্কিল</span>
        </Link>

        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/progress/"
            onClick={onClose}
            className={`control px-2.5 py-1 text-[11px] ${onProgressPage ? "control--primary" : ""}`}
          >
            অগ্রগতি
          </Link>

          {onClose && (
            <button
              onClick={onClose}
              className="control control--quiet p-1.5"
              aria-label="সাইডবার বন্ধ করুন"
            >
              <X size={14} />
            </button>
          )}

          {onCollapse && (
            <button
              onClick={onCollapse}
              className="control control--quiet p-1.5"
              aria-label="সূচিপত্র লুকান"
              aria-expanded
              aria-controls="site-sidebar"
            >
              <PanelLeftClose size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 shrink-0 flex flex-col gap-4">
        <ProgressReadout percent={mounted ? progressPercent : 0} />

        <div className="relative">
          <span className="t-muted absolute left-2.5 top-2.5 flex pointer-events-none" aria-hidden>
            <Search size={14} />
          </span>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Escape") return;
              if (search) setSearch("");
              else event.currentTarget.blur();
            }}
            placeholder="অধ্যায় বা বিষয় খুঁজুন..."
            aria-label="অধ্যায় বা বিষয় খুঁজুন (শর্টকাট: / বা Ctrl+K)"
            className="surface-well t-body w-full pl-8 pr-8 py-2 text-sm"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="control control--quiet absolute right-1.5 top-1.5 px-1.5 py-1"
              aria-label="খোঁজা বাতিল"
            >
              <X size={12} />
            </button>
          ) : (
            <span
              className="t-caption t-mono hidden lg:inline absolute right-2.5 top-2 pointer-events-none select-none text-[11px]"
              title="শর্টকাট: / অথবা Ctrl+K"
            >
              /
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {searching ? (
          <div className="flex flex-col gap-5">
            {noMatches && (
              <div className="surface-well t-caption p-4 text-center">
                &ldquo;{search}&rdquo; দিয়ে কিছু পাওয়া যায়নি।
              </div>
            )}

            {docMatches.length > 0 && (
              <div className="topic-group pb-4 flex flex-col gap-1.5">
                <span className="t-label">অধ্যায় ({docMatches.length})</span>
                {docMatches.map((doc) => (
                  <Link
                    key={doc.route}
                    href={doc.route}
                    onClick={onClose}
                    aria-current={normalize(doc.route) === pathname ? "true" : undefined}
                    className="row block px-3 py-2 text-xs truncate"
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
            )}

            {headingMatches.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="t-label">বিষয় ({headingMatches.length})</span>
                {headingMatches.map((entry) => (
                  <Link
                    key={`${entry.docRoute}${entry.headingId}`}
                    href={`${entry.docRoute}#${entry.headingId}`}
                    onClick={onClose}
                    className="row block px-3 py-2"
                  >
                    <span className="block text-xs truncate">{entry.headingText}</span>
                    <span className="t-caption block truncate">{entry.docTitle}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {nav.map((group) => {
              const counts = groupCounts[group.id] ?? { read: 0, total: group.items.length };

              return (
                <div key={group.id} className="topic-group pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="t-strong text-sm min-w-0 truncate">{group.label}</h4>
                    <span className="chip shrink-0" suppressHydrationWarning>
                      {mounted ? counts.read : 0}/{counts.total}
                    </span>
                  </div>

                  <div className="seam-l flex flex-col gap-1.5 pl-2 ml-1">
                    {group.items.map((doc) => {
                      const state = docState[doc.route];
                      const active = normalize(doc.route) === pathname;
                      const read = mounted && state?.read;

                      return (
                        <Link
                          key={doc.route}
                          href={doc.route}
                          onClick={onClose}
                          aria-current={active ? "true" : undefined}
                          className="row flex items-center justify-between gap-2 px-3 py-2 text-xs"
                        >
                          <span className="flex min-w-0 items-center gap-1.5">
                            <span className="w-3 shrink-0" aria-hidden suppressHydrationWarning>
                              {read ? <Check size={11} /> : null}
                            </span>
                            <span className="truncate">{doc.title}</span>
                          </span>
                          {state && state.drillTotal > 0 && (
                            <span className="text-[10px] shrink-0" suppressHydrationWarning>
                              ({mounted ? state.drillsDone : 0}/{state.drillTotal})
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
