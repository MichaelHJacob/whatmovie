import Image from "next/image";

import NowStreaming from "@/app/(home)/components/NowStreaming";
import Container from "@/components/layout/Container";
import ListScrollController from "@/components/layout/ListScrollController";
import HTitle from "@/components/ui/HTitle";
import ListMovie from "@/components/ui/ListMovie";
import { getNowPlaying } from "@/lib/api/tmdb/use-cases/getNowPlaying";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { tv } from "tailwind-variants";

import LogoWmExtended_Dark from "../../../public/logo/LogoWmExtended_Dark.png";
import LogoWmExtended_Light from "../../../public/logo/LogoWmExtended_Light.png";

const homeStyle = tv({
  slots: {
    inner:
      "blockContainer-px blockContainer-pb grid h-full w-full grid-cols-5 grid-rows-[repeat(10,auto)]",
    containerImage:
      "animate-presets col-span-3 col-start-2 row-span-1 row-start-2 flex w-full animate-fade-up items-center justify-center",
    containerText:
      "animate-presets relative z-10 col-span-full row-start-10 flex animate-fade-up items-center justify-center opacity-0 animate-delay-100",
    text: "inline-block text-center font-sans text-base font-bold text-base-body",
  },
});

export default async function Home() {
  const [inTheatres] = await getNowPlaying();
  const [popular] = await getPopular();
  const { inner, containerImage, containerText, text } = homeStyle();

  return (
    <main>
      <Container as="header" model="initial" paddingTop innerStyles={inner()}>
        <div className={containerImage()}>
          <Image
            className="hidden max-md:w-72 md:w-80 dark:block"
            src={LogoWmExtended_Dark}
            alt="What Movie Logo"
            quality={100}
            sizes="(max-width: 768px) 288px, (min-width: 768px) 320px"
            priority
          />
          <Image
            className="block max-md:w-72 md:w-80 dark:hidden"
            src={LogoWmExtended_Light}
            alt="What Movie Logo"
            quality={100}
            sizes="(max-width: 768px) 288px, (min-width: 768px) 320px"
            priority
          />
        </div>
        <div className={containerText()}>
          <p className={text()}>
            Veja nossas listas, encontra um filme pela busca ou descubra{" "}
            <span className="relative -z-10 -my-2 mx-2 inline-block w-min -rotate-2 whitespace-nowrap rounded-md bg-amber-400 p-2 dark:bg-amber-600">
              &quot;O filme incrível!&quot;
            </span>{" "}
            com filtro.
          </p>
        </div>
      </Container>
      {popular?.results && (
        <Container as="section" surface="listBase">
          <HTitle>Mais acessados</HTitle>
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
  );
}
