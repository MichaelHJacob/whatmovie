import { DetailsMovieType } from "@/components/utils/types";
import { Container } from "@/components/container";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";

async function getBase64(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);

  if (!base64) {
    throw new Error("Falha ao buscar imagem 64");
  }

  return base64;
}

async function getDetails(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + id + process.env.DB_API_BR,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

async function getCssBlurIMG(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { css } = await getPlaiceholder(buffer);

  if (!css) {
    throw new Error("Falha ao buscar imagem 64");
  }

  return css;
}

export default async function Movie({
  params,
}: {
  params: { movieId: string };
}) {
  const data: DetailsMovieType = await getDetails(params.movieId);
  const base64 = await getBase64(process.env.DB_IMG_URL_S + data.poster_path);
  const css = await getCssBlurIMG(process.env.DB_IMG_URL_S + data.poster_path);

  if (!data || !params.movieId) {
    redirect("/");
  }

  return (
    <main>
      <Container>
        <div
          className="fixed inset-0 w-full h-full transform scale-150 filter opacity-50 blur-3xl z-[-1] "
          style={css}
        />
        <div className="relative h-[90vh] aspect-[2/3]  flex">
     
          <Image
            src={process.env.DB_IMG_URL_L + data.poster_path}
            blurDataURL={base64}
            alt={data.original_title}
            width={780}
            height={1170}
            placeholder="blur"
            sizes="90vh"
            className="rounded-xl object-cover shadow-2xl shadow-gray-700/100 "
            priority={true}
          />
          <div className="p-12  my-auto"> 
          <h2 className="title text-6xl ">{data.original_title}</h2>
          </div>
        </div>
        
      </Container>
    </main>
  );
}
