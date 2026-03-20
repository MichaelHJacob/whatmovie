import Image from "next/image";

import NowStreaming from "@/app/(home)/components/NowStreaming";
import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import ListScrollController from "@/components/layout/ListScrollController";
import HTitle from "@/components/ui/HTitle";
import ListMovie from "@/components/ui/ListMovie";
import { getNowPlaying } from "@/lib/api/tmdb/use-cases/getNowPlaying";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { homeJsonLd } from "@/lib/structured-data/homeJsonLd";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";
import clsx from "clsx";
import { tv } from "tailwind-variants";

import LogoWmExtended_Dark from "../../../public/logo/LogoWmExtended_Dark.png";
import LogoWmExtended_Light from "../../../public/logo/LogoWmExtended_Light.png";

const homeStyle = tv({
  slots: {
    inner:
      "blockContainer-px blockContainer-pb grid h-full w-full grid-cols-5 grid-rows-[repeat(10,auto)] justify-items-center",
    containerImage:
      "animate-presets col-span-3 col-start-2 row-span-1 row-start-2 flex w-full animate-fade-up items-center justify-center max-md:col-span-full",
    containerText:
      "animate-presets z-10 col-span-full row-start-10 flex animate-fade-up items-center justify-center opacity-0 animate-delay-100 md:max-w-2xl",
    text: "inline-block text-center font-sans text-base font-bold text-base-body",
    image: "w-full max-w-80 xs:max-w-sm lg:max-w-md",
    size: "(min-width: 1024px) 448px, (min-width: 475px) 384px, 100vw",
  },
});

export default async function Home() {
  const [inTheatres] = await getNowPlaying();
  const [popular] = await getPopular();
  const { inner, containerImage, containerText, text, image, size } =
    homeStyle();

  return (
    <>
      <StructuredData data={homeJsonLd()} />
      <main>
        <Container as="header" model="initial" paddingTop innerStyles={inner()}>
          <div className={containerImage()}>
            <Image
              className={clsx(image(), "hidden dark:block")}
              src={LogoWmExtended_Dark}
              alt="What Movie Logo"
              quality={100}
              sizes={size()}
              priority
            />
            <Image
              className={clsx(image(), "block dark:hidden")}
              src={LogoWmExtended_Light}
              alt="What Movie Logo"
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
        {popular?.results && (
          <Container as="section" surface="listBase">
            <HTitle>Mais acessados</HTitle>
            <StructuredData
              data={itemListJsonLd(popular, "popular", "Mais acessados")}
            />
            <ListScrollController
              id={"popular"}
              length={popular.results.length}
              surface
            >
              <ListMovie data={popular?.results} id={"popular"} />
            </ListScrollController>
          </Container>
        )}
        <NowStreaming />
        {inTheatres && (
          <Container as="section" surface="listBase">
            <HTitle>Principais títulos nos Cinemas</HTitle>
            <StructuredData
              data={itemListJsonLd(
                inTheatres,
                "theatres",
                "Principais títulos nos Cinemas",
              )}
            />
            <ListScrollController
              id={"lancamentos"}
              length={inTheatres.results.length}
              surface
            >
              <ListMovie data={inTheatres?.results} id={"lancamentos"} />
            </ListScrollController>
          </Container>
        )}
      </main>
    </>
  );
}
