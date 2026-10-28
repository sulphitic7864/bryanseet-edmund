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
  // whether Firestore has a site/content document.
  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-white px-6 text-neutral-900 dark:bg-neutral-950 dark:text-white">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-neutral-200 border-t-yellow-500 dark:border-neutral-800 dark:border-t-yellow-500" />
          <p className="mt-4 text-sm font-semibold text-neutral-500">
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
      <main className="grid min-h-screen place-items-center bg-white px-6 text-neutral-900 dark:bg-neutral-950 dark:text-white">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-950 dark:bg-red-950/30">
          <h1 className="text-lg font-black text-red-700 dark:text-red-300">
            Unable to load website content
          </h1>
          <p className="mt-2 text-sm leading-6 text-red-600 dark:text-red-300">
            {error}
          </p>
          <p className="mt-3 text-xs leading-5 text-neutral-500">
            Check the Firebase configuration and Firestore rules for the
            <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">
              site/content
            </code>
            document.
          </p>
        </div>
      </main>
    );
  }

  return <SiteShell>{children}</SiteShell>;
}
