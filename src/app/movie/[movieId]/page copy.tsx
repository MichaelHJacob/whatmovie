import { DetailsMovieType } from "@/components/utils/types";
import { Container } from "@/components/comps";
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
        <div className="flex w-full h-full bg-black">
          <div
            className="fixed inset-0 w-full h-full transform scale-150 filter opacity-50 blur-3xl z-[-1] "
            style={css}
          />
          <div className="relative max-h-[80vh] max-w-[50vw]  aspect-[2/3] m-8">
            <Image
              src={process.env.DB_IMG_URL_L + data.poster_path}
              blurDataURL={base64}
              alt={data.original_title}
              width={780}
              height={1170}
              placeholder="blur"
              sizes="80vh"
              className="rounded-xl object-cover shadow-2xl shadow-gray-700/100 "
              priority={true}
            />
          </div>
          {/* <div className=" w-full bg-white pb-safe"></div> */}
          <div className="  m-6 my-auto">
            <div className="p-12 bg-slate-300/30 m-6 ">
              <p>Titulo: {data.title}</p>
              {data.belongs_to_collection && (
                <p>Titulo: {data.belongs_to_collection.name} </p>
              )}
              <div>
                <h3>Sinopse</h3>
                <p>{data.overview}</p>
              </div>
            </div>
            <div className="p-12 bg-slate-300 m-6 ">
              <h2 className=" ">{data.title}</h2>
              <p>titulo original: {data.original_title}</p>
              <p>Idioma original: {data.original_language}</p>
              <p>data de lançamento:{data.release_date}</p>
              <p>duração:{data.runtime}</p>
              <p>
                gêneros:
                {data.genres.map((value) => (
                  <span>
                    <span>{value.name} - </span>
                  </span>
                ))}
              </p>
            </div>

            <div className="p-12 bg-slate-300 m-6 ">
              <p>status: {data.status}</p>
              <p>home Page: {data.homepage}</p>
              <p>
                empresas_produção:
                {data.production_companies.map((value) => (
                  <span>
                    {" "}
                    - {value.id}- {value.name} - {value.origin_country}
                  </span>
                ))}
              </p>
              <p>
                Pais de Produção:
                {data.production_countries.map((value) => (
                  <span>
                    {" "}
                    - {value.iso_3166_1}- {value.name}{" "}
                  </span>
                ))}
              </p>
              <p>Orçamento:{data.budget}</p>
              <p>receita: {data.revenue}</p>
            </div>
           

            <div className="p-12 bg-slate-300 m-6 ">
              <p>Popularidade :{data.popularity}</p>
              <p>pontuação :{data.vote_average}</p>
              <p>contagem de votos :{data.vote_count}</p>
            </div>
            <div className="p-12 bg-slate-300/30 m-6 ">
              <p>imdb id : {data.imdb_id}</p>
              <p>tmdb id : {data.id}</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
