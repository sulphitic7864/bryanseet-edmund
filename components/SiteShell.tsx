"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";
import { useSiteContent } from "@/components/SiteContentProvider";

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
      <nav className="rounded-[36px] border border-yellow-100/60 bg-white/85 px-5 py-3 shadow-sm backdrop-blur-xl dark:border-neutral-700 dark:bg-neutral-900/90">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-black tracking-tight"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-500 text-sm text-black">
              BS
            </span>
            <span className="hidden sm:block">{siteContent.name}</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={`/${href}`}
                className="text-sm font-semibold text-neutral-700 transition hover:text-yellow-600 dark:text-neutral-300"
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
              className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 grid gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-700 md:hidden">
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={`/${href}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
    <footer className="mt-20 border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-[85rem] flex-col gap-5 px-5 py-10 text-sm text-neutral-600 dark:text-neutral-400 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-black text-neutral-900 dark:text-white">
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
              className="hover:text-yellow-600"
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
