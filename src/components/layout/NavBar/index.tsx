import { Suspense } from "react";
import Search from "@/components/layout/NavBar/Search";
import Link from "next/link";

type NavBarProps = {  fixed?: boolean; dark?: boolean  };

export default function NavBar({ fixed, dark  }: NavBarProps) {
  return (
    <header
      className={`w-full top-0 left-0 z-[1000] overflow-visible backdrop-blur-md ${
        dark ? "bg-nightDew-700/30" : "bg-nightDew-200/80"
      } ${fixed ? "fixed" : "absolute"}`}
    >
      <nav className="w-full h-11 z-[2000] px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl mx-auto  flex justify-start items-center   transition-all duration-700 overflow-visible gap-[var(--gap)] xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]">
        <Suspense>
          <Search />
        </Suspense>

        <Link
          href={`/filter`}
          target="_top"
          className={`header-backBtn overflow-hidden  min-w-fit  justify-start peer-open:w-0 peer-open:px-0 peer-open:min-w-0 peer-open:opacity-0 opacity-100 order-3 ${
            dark && "hover:bg-opacity-10"
          }`}
        >
          <img
            src="/icons/filterIcon.svg"
            className={`w-6 h-6 ${dark && "invert"}`}
            width={24}
            height={24}
          />
          <h2
            className={`textBtn ${
              dark ? "text-nightDew-100" : "text-nightDew-700"
            }`}
          >
            Filtro
          </h2>
        </Link>

        <div className="w-full max-sm:peer-open:w-0 max-sm:peer-open:opacity-0 transition-all duration-700 overflow-hidden">
          <Link
            href="/"
            className={`w-auto flex items-center gap-2
         `}
          >
            <img
              src="/logo/wmIcon.svg"
              className={`w-5 h-5 ${dark && "invert"}`}
              alt="What Movie Logo"
              width={20}
              height={20}
            />
            <h1
              className={`tracking-wider whitespace-nowrap text-lg font-logo font-[700] antialiased ${
                dark ? "text-nightDew-100" : "text-nightDew-700 textShadow"
              }`}
            >
              What Movie
            </h1>
          </Link>
        </div>
      </nav>
    </header>
  );
}