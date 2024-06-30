import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Caladea, Open_Sans, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import Search from "@/components/client/search";

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
  description:
    "O filme para sua escolha certa!",
  metadataBase: new URL('https://wm-whatmovie.vercel.app'),
  openGraph: {
    images: '/icon4.png'
  }
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
      <body className="bg-nightDew-200 overflow-x-clip scrollStyle font-sans">
        <header className=" w-full fixed top-0 left-0 z-[1000] overflow-visible">
          <nav
            className="w-full h-11 z-[2000]   
      px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl
      mx-auto  flex justify-start items-center xl:rounded-lg   transition-all duration-700 overflow-visible bg-nightDew-100
      gap-[var(--gap)] 
    xs:gap-[var(--gapXS)] 
    md:gap-[var(--gapMD)] 
    lg:gap-[var(--gapLG)]"
          >
            <Suspense>
              <Search />
            </Suspense>

            <Link
              href={`/filter`}
              target="_top"
              className="header-backBtn overflow-hidden  min-w-fit  justify-start peer-open:w-0 
              peer-open:px-0 peer-open:min-w-0 peer-open:opacity-0 opacity-100 order-3"
            >
              <img
                src="/filterIcon.svg"
                className="w-6 h-6"
                width={20}
                height={20}
              />
              <h2>Filtro</h2>
            </Link>

            <div className="w-full max-sm:peer-open:w-0 max-sm:peer-open:opacity-0 transition-all duration-700 overflow-hidden">
              <Link
                href="/"
                className={` w-auto flex items-center gap-2 `}
              >
                <img
                  src="/wmIcon.svg"
                  className="w-5 h-5 "
                  alt="What Movie Logo"
                  width={20}
                  height={20}
                />
                <h1 className="tracking-wider whitespace-nowrap text-lg font-logo font-[700] textShadow text-nightDew-700 antialiased">What Movie</h1>
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
