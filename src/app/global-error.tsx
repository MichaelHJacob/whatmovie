"use client";

import { Caladea, Open_Sans, Source_Sans_3 } from "next/font/google";

import "@/app/globals.css";
import ErrorPage from "@/components/error/ErrorPage";
import NavBar from "@/components/layout/NavBar";

const ss_pro = Source_Sans_3({
  style: "normal",
  subsets: ["latin"],
  variable: "--font-ss-pro",
});

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
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="pt-br"
      className={`${caladea.variable} ${open_sans.variable} ${ss_pro.variable} text-[100%]`}
    >
      <body className="scrollStyle overflow-x-clip bg-amber-700 font-sans">
        <NavBar dark fixed />
        <main>
          <ErrorPage model="errorPage" as="section" onRetry={reset} />
        </main>
      </body>
    </html>
  );
}
