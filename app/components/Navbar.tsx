"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import ProgressReadout from "./ProgressReadout";

interface NavbarProps {
  read: number;
  total: number;
  percent: number;
  onOpenSidebar: () => void;
}

/**
 * সরু স্ক্রিনের টপ বার। `lg:` থেকে উপরে rail নিজেই পরিচয় আর progress readout
 * বহন করে, তাই এটা সম্পূর্ণ অদৃশ্য হয়ে যায় — স্ক্রিনে কখনো দুটো ব্র্যান্ড থাকে না।
 */
export default function Navbar({ read, total, percent, onOpenSidebar }: NavbarProps) {
  return (
    <header className="surface-app seam-b shrink-0 w-full py-3 px-4 sm:px-6 flex items-center justify-between gap-3 lg:hidden">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="control control--quiet p-2 shrink-0"
          aria-label="নেভিগেশন খুলুন"
        >
          <Menu size={16} />
        </button>

        <span className="text-2xl shrink-0" aria-hidden>
          🧭
        </span>
        <div className="min-w-0">
          <Link href="/" className="t-title block text-base sm:text-xl truncate">
            সফট স্কিল
          </Link>
          <p className="t-caption hidden sm:block">চার স্তরের রোডম্যাপ</p>
        </div>
      </div>

      <div className="surface-raised hidden sm:flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 shrink-0">
        <span className="t-label hidden md:inline">অগ্রগতি</span>
        <span className="t-mono t-accent text-xs sm:text-sm" suppressHydrationWarning>
          {read}/{total}
          <span className="hidden md:inline"> ({percent}%)</span>
        </span>
        <ProgressReadout percent={percent} className="h-2 w-16 sm:w-20" />
      </div>
    </header>
  );
}
