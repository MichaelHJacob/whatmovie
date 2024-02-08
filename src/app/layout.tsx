import "./globals.css";
import type { Metadata , Viewport } from "next";
import { Barlow } from "next/font/google";
// import Background from "@/components/background";
import { Header } from "@/components/comps";


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
      <body className="bg-Background overflow-x-hidden scrollStyle">
       
        <Header />

      
        {children}
        
       

      </body>
    </html>
  );
}
