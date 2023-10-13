import type { Metadata } from "next";
import { DetailsMovieType } from "@/components/utils/types";
import { Container } from "@/components/container";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getDetails(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(process.env.DB_API_URL + id + process.env.DB_API_BR, options);

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}



export default async function Movie({
  params,
}: {
  params: { movieId: string };
}) {
  const data: DetailsMovieType = await getDetails(params.movieId);

  if(!data) {
    redirect("/")
  }

console.log("url ", process.env.DB_IMG_URL_L+data.poster_path)
  return (
    <main>
      <Container>
        <Image 
        src={process.env.DB_IMG_URL_L + data.poster_path}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
        alt={data.original_title}
        width={780}
        height={1170}
        placeholder="blur"
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-md"
        priority
        
        />
        <h3>title: {data.original_title}</h3>
      </Container>
    </main>
  );
}


export const metadata: Metadata = {
  title: "Página do filme",
  description: "informações sobre o filme",
};
