import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteContentProvider from "@/components/SiteContentProvider";
import AppChrome from "@/components/AppChrome";

export const metadata: Metadata = {
  title: {
    default: "Bryan Seet | Prudential Senior Wealth Manager",
    template: "%s | Bryan Seet",
  },
  description:
    "Bryan Seet is a Prudential Wealth Manager focused on long-term financial planning, protection, and client relationships.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteContentProvider><AppChrome>{children}</AppChrome></SiteContentProvider>
      </body>
    </html>
  );
}
