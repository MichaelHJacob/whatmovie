import "./globals.css";
import type { Metadata , Viewport } from "next";
import { Barlow } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import Search from "@/components/client/search";


const barlow = Barlow({weight: ['400', '500', '600', '700'], subsets: ['latin']})

export const metadata: Metadata = {
  title: "What Movie",
  description: "O web site que ajuda responder a questão, que filme é esse? ou simplesmente, que filme assistir?",
};

export const viewport: Viewport = {
  themeColor: '#F8F8F8',
  //  [
  //   { media: '(prefers-color-scheme: light)', color: '#e4e6e6fe' },
  //   { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },   
  // ],
}


export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={barlow.className}>
      <body className="bg-Background overflow-x-clip scrollStyle">
       
      <header className=" w-full max-w-screen-2xl  top-0 fixed left-1/2 translate-x-[-50%] z-[1000] overflow-visible">
      <nav
        className="w-full h-11 z-[2000]  backdrop-saturate-150   backdrop-blur-xl 
      px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl 
      mx-auto  flex justify-start items-center xl:rounded-lg   transition-all duration-700 overflow-visible  has-[:open]:bg-black invert-0
     
      gap-[var(--gap)] 
    xs:gap-[var(--gapXS)] 
    md:gap-[var(--gapMD)] 
    lg:gap-[var(--gapLG)] "
      >
        <Suspense>
          <Search />
        </Suspense>

        <Link
          href={`/filter`}
          className=" main-backBtn bg-transparent main-TextBtn   overflow-hidden  backdrop-filter-none w-36 justify-center px-0
          peer-open:w-0  order-3"
        >
          <h2>Filtro</h2>
        </Link>

        <div className="w-full max-sm:peer-open:w-0 max-sm:peer-open:opacity-0 transition-all duration-700 overflow-hidden">
          <Link
            href="/"
            className="btn-link text-xl  font-bold whitespace-nowrap w-auto "
          >
            <h1>What Movie</h1>
          </Link>
        </div>
      </nav>
    </header>

      
        {children}
        
       

      </body>
    </html>
  );
}
