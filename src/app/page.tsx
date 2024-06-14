import "./globals.css";
import { NowPlaying } from "@/components/utils/types";
import { Container } from "@/components/frame";
import { SubTitle } from "@/components/comps";
import { ListMovie } from "@/components/comps";
import { ListControl } from "@/components/client/comps";

async function getTheatres() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 3600 },
  };

  const res = await fetch(
    `${process.env.DB_API_URL}now_playing?language=pt-BR&watch_region=BR&page=1`,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao dados get theatres");
  }
  return res.json();
}

export default async function Home() {
  const inTheatres: NowPlaying = await getTheatres();

  return (
    <Container>
      <div className="min-h-dvh  w-full flex flex-col justify-between ">
        <div className="w-full landscape:min-h-96 flex-1 mx-auto flex justify-center items-center paddingHeader">
          <div className="relative  before:content-[''] before:absolute before:w-[200%]  before:h-2/3 before:bg-gradient-to-r before:from-[#F66659] before:via-[#25356B] before:to-[#00CCFF] before:rounded-full before:opacity-70 before:left-1/2 before:-translate-x-[43%] before:-rotate-2 before:blur-3xl before:top-3/4  ">
          <img
              className="drop-shadow-[0_15px_25px_#69696954]"
              src="/logoWM.svg"
              alt="What Movie Logo"
              width={180}
              height={180}
            />
          </div>
        </div>
        <div className="bg-Surface relative before:shadow-2xl before:shadow-black before:bg-Surface  before:w-screen before:h-full before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:z-[-1]">
        
            <SubTitle>Lançamentos</SubTitle>
            <ListControl id={"lancamentos"} length={inTheatres.results.length} color="Surface" >
              <ListMovie data={inTheatres?.results} id={"lancamentos"} />
            </ListControl>
          
        </div>
      </div>
    </Container>
  );
}
