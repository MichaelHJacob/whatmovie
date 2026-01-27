"use client";

import { Caladea, Open_Sans } from "next/font/google";

import "@/app/globals.css";
import ErrorPage from "@/components/error/ErrorPage";
import NavBar from "@/components/layout/NavBar";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const caladea = Caladea({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-caladea",
});

export default function GlobalError({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <html lang="pt-br" className={`${caladea.variable} ${open_sans.variable}`}>
      <body className="overflow-x-clip bg-notice-accent font-sans">
        <NavBar dark fixed />
        <main>
          <ErrorPage model="errorPage" as="section" onRetry={reset} />
        </main>
      </body>
    </html>
  );
}
