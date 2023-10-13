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

console.log("url ", process.env.DB_IMG_URL_M+data.poster_path)
  return (
    <main>
      <Container>
<div className="relative h-[90vh] aspect-[2/3] ">
<Image 
        src={process.env.DB_IMG_URL_M + data.poster_path}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsKy7LAAAEjwHJNDYILQAAAABJRU5ErkJggg=="
        alt={data.original_title}
        // fill={true}
        width={780}
        height={1170}
        placeholder="blur"
        sizes="90vh"
        className="rounded-xl object-cover shadow-2xl shadow-black/70 "
        priority={true}
        
        />
</div>
        <h3>title: {data.original_title}</h3>
      </Container>
    </main>
  );
}


// export const metadata: Metadata = {
//   title: "Página do filme",
//   description: "informações sobre o filme",
// };
