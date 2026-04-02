import Image from "next/image";

import NowStreaming from "@/app/(home)/components/NowStreaming";
import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
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
      "blockContainer-px blockContainer-pb grid h-full w-full grid-cols-5 grid-rows-[repeat(10,auto)]",
    containerImage:
      "animate-presets col-span-3 col-start-2 row-span-1 row-start-2 flex w-full animate-fade-up items-center justify-center max-md:col-span-full",
    containerText:
      "animate-presets relative z-10 col-span-full row-start-10 flex animate-fade-up items-center justify-center opacity-0 animate-delay-100",
    text: "inline-block text-center font-sans text-base font-bold text-base-body max-sm:text-sm",
    image: "w-full max-w-80",
    size: "(max-width: 475px) 100vw, (min-width: 475px) 384px",
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
              Veja nossas listas, encontra um filme pela busca ou descubra{" "}
              <span className="relative inline-block whitespace-nowrap before:absolute before:top-1/2 before:-z-10 before:h-full before:w-full before:-translate-y-1/2 before:-rotate-2 before:rounded-md before:bg-amber-400 before:p-3 before:dark:bg-amber-600">
                &quot;O filme incrível!&quot;
              </span>{" "}
              com filtro.
            </p>
          </div>
        </Container>
        {popular?.results && (
          <Container as="section" surface="listBase">
            <HTitle>Mais acessados</HTitle>
            <StructuredData
              data={itemListJsonLd(
                popular.results
                  .filter((data) => data.vote_count >= 100)
                  .sort((a, b) => b.popularity - a.popularity),
                "popular",
                "Mais acessados",
              )}
            />
            <MovieList
              data={popular.results
                .filter((data) => data.vote_count >= 100)
                .sort((a, b) => b.popularity - a.popularity)}
              model="list"
              surfaceColor="listBase"
            />
          </Container>
        )}
        <NowStreaming />
        {inTheatres && (
          <Container as="section" surface="listBase">
            <HTitle>Principais títulos nos Cinemas</HTitle>
            <StructuredData
              data={itemListJsonLd(
                inTheatres.results,
                "theatres",
                "Principais títulos nos Cinemas",
              )}
            />
            <MovieList
              data={inTheatres.results}
              model="list"
              surfaceColor="listBase"
            />
          </Container>
        )}
      </main>
    </>
  );
}
