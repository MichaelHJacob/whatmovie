import "./globals.css";
import { NowPlaying } from "@/components/utils/types";
import {
  ListMovie,
  Container,
  SubTitle,
  BlockContainer,
} from "@/components/comps";

async function getTheatres() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 3600 },
  };

  const res = await fetch(
    `${process.env.DB_API_URL}now_playing${process.env.DB_API_BR}&page=1`,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao dados get theatres");
  }
  return res.json();
}

async function getUpcoming() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    `${process.env.DB_API_URL}upcoming${process.env.DB_API_BR}&page=1`,
    options
  );
  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export default async function Home() {
  const inTheatres: NowPlaying = await getTheatres();
  const upcoming = await getUpcoming();
  return (
    <Container>
      <div className="min-h-dvh w-full flex flex-col justify-between ">
        <div className="w-min  flex-1 mx-auto flex align-middle paddingHeader ">
          <h1 className="text-5xl text-center rounded-lg w-min my-auto mx-auto   text-onBackground1   ">
            WM
          </h1>
        </div>

        <BlockContainer>
          <SubTitle>Lançamentos</SubTitle>
          <ListMovie data={inTheatres?.results} />
        </BlockContainer>
      </div>
    </Container>
  );
}
