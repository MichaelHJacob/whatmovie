export async function GET() {
  const res = await fetch(
    `${process.env.DB_API_URL_F}genre/movie/list${process.env.DB_API_BR}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados de gêneros");
  }

  const data = await res.json();

  return Response.json( data );
}

