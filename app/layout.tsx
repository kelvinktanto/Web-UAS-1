import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import LibraryNav from "@/components/LibraryNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PustakaKu | Perpustakaan Sekolah",
    template: "%s | PustakaKu",
  },
  description: "Katalog buku perpustakaan sekolah SMA.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <LibraryNav />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
