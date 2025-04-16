import config from "@/config/apiConfig";

export async function GET() {
  const res = await fetch(
    `${config.apiUrl}genre/movie/list?language=pt-BR&watch_region=BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }

  const data = await res.json();

  return Response.json(data);
}
