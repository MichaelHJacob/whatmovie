import Link from "next/link";

import { QueryProvider } from "@/components/Providers";
import NavbarBase from "@/components/layout/NavBar/NavbarBase";
import Search from "@/components/layout/NavBar/Search";
import { navbarBase } from "@/components/layout/NavBar/navbar.styles";
import TmdbConfigProvider from "@/components/providers/TmdbConfigProvider";
import { imgBaseUrl } from "@/lib/utils/getImageBaseUrl";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const navbar = tv({
  extend: navbarBase,
  slots: {
    menu: "all-gap flex w-full items-center justify-end",
    scrim:
      "invisible fixed inset-0 -z-20 h-dvh w-screen bg-scrim-menu opacity-0 backdrop-blur-xl transition-all duration-1000 peer-data-[bgscrim='true']:visible peer-data-[bgscrim='true']:opacity-100 [[data-theme='movie']_~_nav_&]:hidden",
  },
});

export default function NavBar() {
  const { btnHeader, btnText, menu, scrim } = navbar();

  return (
    <NavbarBase>
      <div className={menu()}>
        <QueryProvider>
          <TmdbConfigProvider config={imgBaseUrl}>
            <Search />
          </TmdbConfigProvider>
        </QueryProvider>
        <Link
          href={`/filter`}
          target="_top"
          className={clsx(btnHeader(), btnText())}
        >
          Filtro
        </Link>
        <div id="scrim" className={scrim()} />
      </div>
    </NavbarBase>
  );
}
