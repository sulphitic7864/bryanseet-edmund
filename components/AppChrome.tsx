"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { loading, error } = useSiteContent();

  // Admin pages have their own loading/error handling and should remain
  // reachable even while public content is loading.
  if (pathname.startsWith("/admin")) {
    return <main>{children}</main>;
  }

  // Never render local fallback content while we are still waiting to learn
  // whether Firestore has an edmund/content document.
  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f4ee] px-6 text-[#0b1d2d] dark:bg-black dark:text-[#f8fafc]">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#dfe3ea] border-t-[#caa96a] dark:border-[#1e2b3d] dark:border-t-[#d9b874]" />
          <p className="mt-4 text-sm font-semibold text-[#4f5d6d] dark:text-[#cfd8e3]">
            Loading website content…
          </p>
        </div>
      </main>
    );
  }

  // A Firestore error is not the same thing as "no Firestore data". Do not
  // silently substitute local content or the problem becomes nearly invisible.
  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f4ee] px-6 text-[#0b1d2d] dark:bg-black dark:text-[#f8fafc]">
        <div className="max-w-lg rounded-3xl border border-[#f1d4a4] bg-[#fffaf2] p-6 text-center dark:border-[#5a4631] dark:bg-[#1d2430]">
          <h1 className="text-lg font-black text-[#8a5a1c] dark:text-[#f5d188]">
            Unable to load website content
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#7a4d13] dark:text-[#f0c972]">
            {error}
          </p>
          <p className="mt-3 text-xs leading-5 text-[#536076] dark:text-[#dfe8f1]">
            Check the Firebase configuration and Firestore rules for the
            <code className="mx-1 rounded bg-[#0b1d2d]/5 px-1.5 py-0.5 dark:bg-white/10">
              edmund/content
            </code>
            document.
          </p>
        </div>
      </main>
    );
  }

  return <SiteShell>{children}</SiteShell>;
}
