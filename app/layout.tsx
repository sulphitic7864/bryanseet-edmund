import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteContentProvider from "@/components/SiteContentProvider";
import AppChrome from "@/components/AppChrome";

export const metadata: Metadata = {
  title: {
    default: "Edmund Chong | Prudential Wealth Manager",
    template: "%s | Edmund Chong",
  },
  description:
    "Edmund Chong is a Prudential Wealth Manager focused on long-term financial planning, protection, and client relationships.",
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
