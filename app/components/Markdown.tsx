"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "../lib/slug";

/**
 * Heading-এর anchor id। `extractHeadings()` ঠিক এই নিয়মেই id বানায় — দুটো এক
 * না থাকলে TOC ও search-এর লিংক নীরবে কোথাও নামবে না।
 */
function headingId(children: React.ReactNode): string | undefined {
  const text = React.Children.toArray(children)
    .map((child) => (typeof child === "string" || typeof child === "number" ? String(child) : ""))
    .join("")
    .replace(/[*_`]/g, "")
    .trim();
  return text ? slugify(text) : undefined;
}

/**
 * রিপোর ভেতরের রিলেটিভ লিংক (`01-foo.md`, `../02-bar/03-baz.md`) সাইট-রুটে
 * রূপান্তর। না করলে ডকের ক্রস-লিংকগুলো সাইটে ৪০৪ দেবে, কারণ route-এ
 * `.md` নেই আর পাথটা `docs/`-এর সাপেক্ষে।
 */
function toSiteHref(href: string, fromRoute: string): string {
  if (/^([a-z]+:|#|\/)/i.test(href)) return href;

  // fromRoute: "/01-self/01-self-awareness/" → base: ["01-self"]
  const base = fromRoute.split("/").filter(Boolean).slice(0, -1);
  const segments = href.replace(/\.md$/i, "").split("/");

  for (const segment of segments) {
    if (segment === "." || segment === "") continue;
    if (segment === "..") base.pop();
    else base.push(segment);
  }
  return `/${base.join("/")}/`;
}

type Props = {
  children: string;
  /** রিলেটিভ লিংক সমাধানের ভিত্তি */
  route: string;
  /** `<p>` ছাড়া inline রেন্ডার — drill বুলেটের জন্য */
  inline?: boolean;
  className?: string;
};

export default function Markdown({ children, route, inline = false, className = "" }: Props) {
  return (
    <div className={`${inline ? "" : "doc-prose"} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: linkChildren, ...rest }) => (
            <a href={toSiteHref(href ?? "", route)} {...rest}>
              {linkChildren}
            </a>
          ),
          h2: ({ children: h2Children, ...rest }) => (
            <h2 id={headingId(h2Children)} {...rest}>
              {h2Children}
            </h2>
          ),
          h3: ({ children: h3Children, ...rest }) => (
            <h3 id={headingId(h3Children)} {...rest}>
              {h3Children}
            </h3>
          ),
          ...(inline
            ? { p: ({ children: pChildren }) => <>{pChildren}</> }
            : {}),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
