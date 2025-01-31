import { NowPlaying } from "@/components/utils/types";
import { Container } from "@/components/frame";
import { SubTitle } from "@/components/comps";
import { ListMovie } from "@/components/comps";
import { ListControl } from "@/components/client/comps";
import Image from "next/image";
import config from "@/components/utils/config";

async function getTheatres() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 3600 },
  };

  const res = await fetch(
    `${config.apiUrlM}now_playing?language=pt-BR&watch_region=BR&page=1`,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export default async function Home() {
  const inTheatres: NowPlaying = await getTheatres();

  return (
    <Container>
      <div className="min-h-dvh  w-full flex flex-col justify-between">
        <div className="w-full blockContainer-x aspect-[2.5/1]  landscape:min-h-96 flex-1 mx-auto flex justify-start items-center bg-[url('/logo/vetorWmOpacity.svg')] bg-no-repeat bg-[center_right_calc(300px*0.3*-1)] bg-[length:300px_300px] ">
          <div className="flex gap-[--gapLG] items-center h-auto relative">
            <Image
              className="object-contain relative h-20 drop-shadow-2xl"
              src="/logo/logoWM.png"
              alt="What Movie Logo"
              width={80}
              height={80}
              priority
            />
            <div className=" flex flex-col justify-center items-start  gap-1 py-[--gapLG]">
              <h1
                className="whitespace-nowrap text-4xl font-logo font-extrabold leading-none text-nightDew-700
              gradient-text"
              >
                What Movie
              </h1>
              <h2 className="font-button text-xl font-extralight leading-none gradient-text">
                O filme para sua escolha certa!
              </h2>
            </div>
          </div>
        </div>
        <div className="relative  before:w-screen before:h-full before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:z-[-1]">
          <SubTitle>Lançamentos</SubTitle>
          <ListControl
            id={"lancamentos"}
            length={inTheatres.results.length}
            surface
          >
            <ListMovie data={inTheatres?.results} id={"lancamentos"} />
          </ListControl>
        </div>
      </div>
    </Container>
  );
}
