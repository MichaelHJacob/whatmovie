import Image from "next/image";

import Container from "@/components/layout/Container";
import ListMovie from "@/components/ui/ListMovie";
import ListScrollController from "@/components/ui/ListScrollController";
import SubTitle from "@/components/ui/SubTitle";
import { getNowPlaying } from "@/lib/api/tmdb/getNowPlaying";

export default async function Home() {
  const [inTheatres] = await getNowPlaying();

  return (
    <Container>
      <div className="flex min-h-dvh w-full flex-col justify-between">
        <div className="blockContainer-x mx-auto flex aspect-[2.5/1] w-full flex-1 items-center justify-start bg-[url('/logo/vetorWmOpacity.svg')] bg-[length:300px_300px] bg-[center_right_calc(300px*0.3*-1)] bg-no-repeat landscape:min-h-96">
          <div className="relative flex h-auto items-center gap-[--gapLG]">
            <Image
              className="relative h-20 object-contain drop-shadow-2xl"
              src="/logo/logoWM.png"
              alt="What Movie Logo"
              width={80}
              height={80}
              priority
            />
            <div className="flex flex-col items-start justify-center gap-1 py-[--gapLG]">
              <h1 className="gradient-text whitespace-nowrap font-logo text-4xl font-extrabold leading-none text-nightDew-700">
                What Movie
              </h1>
              <h2 className="gradient-text font-button text-xl font-extralight leading-none">
                O filme para sua escolha certa!
              </h2>
            </div>
          </div>
        </div>
        {inTheatres && (
          <div className="relative before:absolute before:bottom-0 before:left-[50%] before:z-[-1] before:h-full before:w-screen before:translate-x-[-50%]">
            <SubTitle>Lançamentos</SubTitle>
            <ListScrollController
              id={"lancamentos"}
              length={inTheatres.results.length}
              surface
            >
              <ListMovie data={inTheatres?.results} id={"lancamentos"} />
            </ListScrollController>
          </div>
        )}
      </div>
    </Container>
  );
}
