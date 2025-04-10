import { Suspense } from "react";

import Link from "next/link";

import Search from "@/components/layout/NavBar/Search";

type NavBarProps = { fixed?: boolean; dark?: boolean };

export default function NavBar({ fixed, dark }: NavBarProps) {
  return (
    <header
      className={`left-0 top-0 z-[1000] w-full overflow-visible backdrop-blur-md ${
        dark ? "bg-nightDew-700/30" : "bg-nightDew-200/80"
      } ${fixed ? "fixed" : "absolute"}`}
    >
      <nav className="z-[2000] mx-auto flex h-11 w-full max-w-7xl items-center justify-start gap-[var(--gap)] overflow-visible px-[var(--p)] transition-all duration-700 xs:gap-[var(--gapXS)] xs:px-[var(--pXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)] lg:px-[var(--pLG)]">
        <Suspense>
          <Search />
        </Suspense>

        <Link
          href={`/filter`}
          target="_top"
          className={`header-backBtn order-3 min-w-fit justify-start overflow-hidden opacity-100 peer-open:w-0 peer-open:min-w-0 peer-open:px-0 peer-open:opacity-0 ${
            dark && "hover:bg-opacity-10"
          }`}
        >
          <img
            src="/icons/filterIcon.svg"
            className={`h-6 w-6 ${dark && "invert"}`}
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

        <div className="w-full overflow-hidden transition-all duration-700 max-sm:peer-open:w-0 max-sm:peer-open:opacity-0">
          <Link href="/" className={`flex w-auto items-center gap-2`}>
            <img
              src="/logo/wmIcon.svg"
              className={`h-5 w-5 ${dark && "invert"}`}
              alt="What Movie Logo"
              width={20}
              height={20}
            />
            <h1
              className={`whitespace-nowrap font-logo text-lg font-[700] tracking-wider antialiased ${
                dark ? "text-nightDew-100" : "textShadow text-nightDew-700"
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
