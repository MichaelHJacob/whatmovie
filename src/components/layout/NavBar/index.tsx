import Link from "next/link";

import WmLetters from "@/assets/logos/wmLetters.svg";
import { QueryProvider } from "@/components/Providers";
import Container from "@/components/layout/Container";
import Search from "@/components/layout/NavBar/Search";
import { navbarBase } from "@/components/layout/NavBar/navbar.styles";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const navbar = tv({
  extend: navbarBase,
  slots: {
    innerNav: "blockContainer-px flex h-full items-center justify-between",
    navContainer:
      "top-0 z-40 h-11 w-full before:top-0 before:-z-10 before:block before:h-11 before:w-full before:backdrop-blur-xl before:backdrop-saturate-150",
    menu: "all-gap flex w-full items-center justify-end",
    theme:
      "group fixed before:fixed before:bg-floating peer-data-[theme=movie]:absolute peer-data-[theme=movie]:before:absolute",
    scrim:
      "invisible fixed inset-0 -z-20 h-dvh w-screen bg-scrim opacity-0 backdrop-blur-xl transition-all duration-1000 peer-data-[bgscrim='true']:visible peer-data-[bgscrim='true']:opacity-100 [[data-theme='movie']_~_nav_&]:hidden",
  },
});

export default function NavBar() {
  const {
    navContainer,
    btnHeader,
    btnText,
    icon,
    innerNav,
    menu,
    theme,
    scrim,
  } = navbar();

  return (
    <Container
      as="nav"
      className={clsx(navContainer(), theme())}
      innerStyles={innerNav()}
    >
      <Link href="/" className={btnHeader()}>
        <WmLetters className={icon({ class: "h-4" })} />
      </Link>

      <div className={menu()}>
        <QueryProvider>
          <Search />
        </QueryProvider>
        <Link href={`/filter`} target="_top" className={btnHeader()}>
          <span className={btnText()}>Filtro</span>
        </Link>
        <div id="scrim" className={scrim()} />
      </div>
    </Container>
  );
}
