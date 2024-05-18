import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  if (query) {
   const res = await fetch(
    `${process.env.DB_API_URL_F}search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=pt-BR&page=1&region=BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados de busca");
  }

  const data = await res.json();

  return Response.json( data );
}
}

