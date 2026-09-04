import type { Metadata } from "next";
import {
  Archivo,
  Archivo_Black,
  Barlow_Semi_Condensed,
  JetBrains_Mono,
  Noto_Sans_Bengali,
} from "next/font/google";
import Shell from "./components/Shell";
import { getDrillCounts, getHeadingIndex, getNav } from "./lib/content";
import "./globals.css";

/**
 * The font shelf. Five families are declared once, each on its own variable;
 * the theme picks which role gets which family via `--t-font-sans` /
 * `--t-font-mono` / `--t-doc-family`.
 *
 * Bengali is on the shelf because the Latin faces carry no Bengali glyphs —
 * without it the browser falls back silently and the reading column loses the
 * theme's typography exactly where most of the reading happens.
 *
 * Adding a family no theme uses yet is the ONLY reason to edit this file.
 */
const grotesk = Archivo({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const display = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const condensed = Barlow_Semi_Condensed({
  variable: "--font-condensed",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "সফট স্কিল — চার স্তরের বাংলা রোডম্যাপ",
    template: "%s — সফট স্কিল",
  },
  description:
    "যোগাযোগ, টিমওয়ার্ক ও নেতৃত্বের বাংলা রোডম্যাপ — নিজের সাথে, চিন্তার সাথে, একজন মানুষের সাথে, অনেক মানুষের সাথে। প্রতিটি অধ্যায়ে সুনির্দিষ্ট অনুশীলন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Read once here rather than per page: the chassis is in the layout, so the
     index and the search that reaches it survive a route change. */
  const nav = getNav();
  const headingIndex = getHeadingIndex();
  const drillCounts = getDrillCounts();

  return (
    <html
      lang="bn"
      className={`${grotesk.variable} ${display.variable} ${condensed.variable} ${mono.variable} ${bengali.variable} h-full antialiased`}
    >
      <body className="surface-app">
        <a
          href="#main-content"
          className="control control--primary sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 px-3 py-1.5 text-xs"
        >
          মূল কনটেন্টে যান
        </a>
        <Shell nav={nav} headingIndex={headingIndex} drillCounts={drillCounts}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
