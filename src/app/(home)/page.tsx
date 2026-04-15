import Image from "next/image";

import NowPlaying from "@/app/(home)/components/MovieList/NowPlaying";
import NowStreaming from "@/app/(home)/components/MovieList/NowStreaming";
import Popular from "@/app/(home)/components/MovieList/Popular";
import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import { homeJsonLd } from "@/lib/structured-data/homeJsonLd";
import clsx from "clsx";
import { tv } from "tailwind-variants";

import LogoWmExtended_Dark from "../../../public/logo/LogoWmExtended_Dark.webp";
import LogoWmExtended_Light from "../../../public/logo/LogoWmExtended_Light.webp";

const homeStyle = tv({
  slots: {
    container:
      "relative bg-[url('/home_gradient.webp')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-white/70 before:backdrop-blur-md dark:before:bg-black/80",
    inner:
      "blockContainer-px blockContainer-pb grid h-full w-full grid-cols-5 grid-rows-[repeat(10,auto)] justify-items-center",
    containerImage:
      "animate-presets col-span-3 col-start-2 row-span-2 row-start-3 flex w-full animate-fade-up items-center justify-center max-md:col-span-full",
    containerText:
      "animate-presets z-10 col-span-full row-start-10 flex animate-fade-up items-center justify-center opacity-0 animate-delay-100 md:max-w-2xl",
    text: "inline-block text-center font-sans text-base font-bold text-base-body",
    image: "w-full max-w-80 xs:max-w-sm lg:max-w-md",
    size: "(min-width: 1024px) 448px, (min-width: 475px) 384px, 100vw",
  },
});

export default async function Home() {
  const { container, inner, containerImage, containerText, text, image, size } =
    homeStyle();

  return (
    <>
      <StructuredData data={homeJsonLd()} />
      <main>
        <Container
          as="header"
          model="initial"
          paddingTop
          className={container()}
          innerStyles={inner()}
        >
          <div className={containerImage()}>
            <Image
              className={clsx(image(), "hidden dark:block")}
              src={LogoWmExtended_Dark}
              alt="WhatMovie - Logo"
              quality={100}
              sizes={size()}
              priority
            />
            <Image
              className={clsx(image(), "block dark:hidden")}
              src={LogoWmExtended_Light}
              alt="WhatMovie - Logo"
              quality={100}
              sizes={size()}
              priority
            />
          </div>
          <div className={containerText()}>
            <p className={text()}>
              Descubra onde assistir aos filmes mais populares e lançamentos do
              cinema. Explore listas atualizadas diariamente, veja trailers
              dublados e use filtros avançados para encontrar sua próxima
              escolha certa.
            </p>
          </div>
        </Container>
        <Popular />
        <NowStreaming />
        <NowPlaying />
      </main>
    </>
  );
}
