import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Caladea, Open_Sans, Source_Sans_3 } from "next/font/google";

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

export const metadata: Metadata = {
  title: "What Movie",
  description: "O filme para sua escolha certa!",
  metadataBase: new URL("https://wm-whatmovie.vercel.app"),
  openGraph: {
    images: "/icon4.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F8F9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      className={`${caladea.variable} ${open_sans.variable} ${ss_pro.variable} text-[100%]`}
    >
      <body className="bg-nightDew-200  overflow-x-clip scrollStyle font-sans">
        {children}
      </body>
    </html>
  );
}
