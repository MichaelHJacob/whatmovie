import NowPlaying from "@/app/(home)/components/MovieList/NowPlaying";
import NowStreaming from "@/app/(home)/components/MovieList/NowStreaming";
import Popular from "@/app/(home)/components/MovieList/Popular";
import Providers from "@/app/(home)/components/Providers";
import WhatMovieText from "@/assets/logos/whatmovie-text.svg";
import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import { homeJsonLd } from "@/lib/structured-data/homeJsonLd";
import clsx from "clsx";
import { tv } from "tailwind-variants";

export const revalidate = 86400;

const homeStyle = tv({
  slots: {
    container:
      "bg-hero relative bg-cover bg-top bg-no-repeat before:absolute before:inset-0 before:block before:bg-white/5 before:backdrop-blur-sm after:absolute after:inset-0 after:block after:animate-fade after:bg-body after:animate-reverse after:animate-duration-1000 after:animate-fill-forwards xl:bg-[length:1536px_auto] dark:before:bg-black/5",
    inner:
      "blockContainer-px blockContainer-pb all-gap relative z-10 h-full w-full flex-col items-center justify-center max-md:flex",
    picture: "relative -my-5 h-auto w-full py-5 drop-shadow-appIcon",
    textH2:
      "mt-4 max-w-96 text-4xl font-bold leading-none tracking-tight md:max-w-lg md:text-[2.75rem] lg:max-w-3xl lg:text-7xl",
    text: "mx-auto animate-fade-up text-center text-base-strong antialiased animate-duration-1000 animate-ease-in-out",
    textP:
      "mb-5 mt-3 block max-w-80 text-lg font-semibold leading-5 tracking-normal sm:max-w-96 md:mt-4 md:max-w-2xl md:leading-6 lg:max-w-4xl lg:text-2xl",
    image: "mx-auto aspect-square h-16 md:h-20 lg:h-24",
  },
});

export default async function Home() {
  const { container, inner, picture, text, textH2, textP, image } = homeStyle();

  return (
    <>
      <StructuredData data={homeJsonLd()} />
      <main>
        <Container
          as="header"
          model="initial"
          paddingTop
          className={clsx(container(), "after:animate-delay-700")}
          innerStyles={inner()}
        >
          <div className="mt-20 w-full animate-show-in">
            <picture className={picture()}>
              <source
                srcSet="/logo/whatmovie_logo_small_2x.webp"
                media="(max-width: 768px)"
                type="image/webp"
              />
              <source
                srcSet="/logo/whatmovie_logo_medium.webp 1x, /logo/whatmovie_logo_medium_2x.webp 2x"
                media="(max-width: 1024px)"
                type="image/webp"
              />
              <source
                srcSet="/logo/whatmovie_logo_large.webp 1x, /logo/whatmovie_logo_large_2x.webp 2x"
                media="(min-width: 1024px)"
                type="image/webp"
              />
              <img
                className={clsx(image())}
                src="/logo/whatmovie_logo_large.png"
                alt="WhatMovie Logo"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <h1 className="mt-3 h-4 animate-fade animate-delay-[500ms] animate-duration-1000 animate-ease-in-out md:mt-5 md:h-5">
              <WhatMovieText className="mx-auto h-full fill-base-accent" />
            </h1>
          </div>
          <div className="w-full">
            <h2 className={clsx(text(), textH2(), "animate-delay-[600ms]")}>
              O filme para sua escolha certa!
            </h2>
            <p className={clsx(text(), textP(), "animate-delay-700")}>
              Descubra onde assistir aos filmes mais populares e lançamentos do
              cinema. Explore listas atualizadas diariamente, veja trailers
              dublados e use filtros avançados para encontrar sua próxima
              escolha certa.
            </p>
          </div>
        </Container>
        <Providers />
        <NowStreaming />
        <NowPlaying />
        <Popular />
      </main>
    </>
  );
}
