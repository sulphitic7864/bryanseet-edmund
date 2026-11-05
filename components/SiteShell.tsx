"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";
import { useSiteContent } from "@/components/SiteContentProvider";
import SafeImage from "./SafeImage";

const links = [
  ["About", "#about"],
  ["Credentials", "#credentials"],
  ["Events", "#events"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
];

export function Header() {
  const { content: siteContent } = useSiteContent();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-[85rem] px-3">
      <nav className="rounded-[36px] border border-[#e8d9b5] bg-[#fffdfb]/90 px-5 py-3 shadow-[0_12px_30px_rgba(9,27,42,0.08)] backdrop-blur-xl dark:border-[#303030] dark:bg-black/90">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-black tracking-tight"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#d5b36a]/40">
              <SafeImage
                src="/images/logo.jpeg"
                alt="Chongforwealth logo"
                className="h-full w-full object-cover"
                wrapperClassName="h-full w-full"
              />
            </span>
            <span className="hidden text-[#0b1d2d] dark:text-[#f8fafc] sm:block">{siteContent.name}</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={`/${href}`}
                className="text-sm font-semibold text-[#203246] transition hover:text-[#b38b48] dark:text-[#dfeaf7] dark:hover:text-[#f0c979]"
              >
                {name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
              className="rounded-full p-2 text-[#0b1d2d] hover:bg-[#f3ead2] dark:text-[#f5f7fa] dark:hover:bg-[#122033]"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 grid gap-3 border-t border-[#e8dfcf] pt-4 dark:border-[#2a2a2a] md:hidden">
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={`/${href}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2 font-semibold text-[#203246] hover:bg-[#f8f1e0] dark:text-[#eaf0f7] dark:hover:bg-[#112234]"
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  const { content: siteContent } = useSiteContent();
  return (
    <footer className="mt-20 border-t border-[#e8dfcf] bg-[#f5f1ea] dark:border-[#262626] dark:bg-black">
      <div className="mx-auto flex max-w-[85rem] flex-col gap-5 px-5 py-10 text-sm text-[#556479] dark:text-[#cfdae6] md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-black text-[#0b1d2d] dark:text-[#f8fafc]">
            {siteContent.name}
          </div>
          <div>
            {siteContent.role} • MAS Rep No. {siteContent.masRep}
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {links.map(([name, href]) => (
            <Link
              key={href}
              href={`/${href}`}
              className="hover:text-[#b38b48] dark:hover:text-[#f0c979]"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="max-w-md md:text-right">
          <div>
            © {new Date().getFullYear()} {siteContent.name}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
