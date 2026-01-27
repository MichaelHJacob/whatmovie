import Link from "next/link";

import WmLetters from "@/assets/logos/wmLetters.svg";
import { QueryProvider } from "@/components/Providers";
import Container from "@/components/layout/Container";
import Search from "@/components/layout/NavBar/Search";
import { navbarBase } from "@/components/layout/NavBar/navbar.styles";
import { tv } from "tailwind-variants";

const navbar = tv({
  extend: navbarBase,
  slots: {
    innerNav: "blockContainer-px z-50 flex h-11 items-center justify-between",
    navContainer:
      "animate-presets top-0 z-40 w-full animate-fade before:absolute before:-inset-0 before:-z-10 before:block before:h-full before:w-full before:backdrop-blur-xl before:backdrop-saturate-150",
    menu: "all-gap group flex w-full items-center justify-end before:invisible before:fixed before:right-0 before:top-0 before:z-40 before:h-dvh before:w-screen before:bg-scrim before:opacity-0 before:backdrop-blur-xl before:transition-all before:duration-1000 has-[input[data-bgScrim='true']]:before:visible has-[input[data-bgScrim='true']]:before:opacity-100",
  },
  variants: {
    fixed: {
      true: {
        navContainer: "sticky -mb-11",
      },
      false: {
        navContainer: "absolute",
      },
    },
    dark: {
      true: {
        navContainer: "bg-nav-black",
        icon: "fill-current text-nav-white hover:fill-current hover:text-nav-white-hover",
      },
      false: {
        navContainer: "bg-floating",
      },
    },
  },
});

type NavBarProps = { fixed?: boolean; dark?: boolean };
export default function NavBar({ fixed, dark = false }: Readonly<NavBarProps>) {
  const { navContainer, btnHeader, btnText, icon, innerNav, menu } = navbar({
    dark,
    fixed,
  });

  return (
    <Container as="nav" className={navContainer()} innerStyles={innerNav()}>
      <Link href="/" className={btnHeader()}>
        <WmLetters className={icon({ class: "h-4" })} />
      </Link>

      <div className={menu()}>
        <QueryProvider>
          <Search dark={dark} />
        </QueryProvider>
        <Link href={`/filter`} target="_top" className={btnHeader()}>
          <span className={btnText()}>Filtro</span>
        </Link>
      </div>
    </Container>
  );
}
