import type { Metadata, Viewport } from "next";
import { Caladea, Open_Sans } from "next/font/google";

import "@/app/globals.css";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

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

export const metadata: Metadata = {
  title: "What Movie",
  description: "O filme para sua escolha certa!",
  metadataBase: new URL("https://whatmovie.com.br"),
  openGraph: {
    images: "/icon4.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#262626" },
  ],
};

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br" className={`${caladea.variable} ${open_sans.variable}`}>
      <body className="overflow-x-clip bg-body font-sans text-neutral-body antialiased">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
