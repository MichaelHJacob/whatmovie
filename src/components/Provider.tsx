"use server"
import Image from "next/image";
import { MovieProviders } from "./utils/types";

async function getAllMovieProviders() {
  const res = await fetch(
    "https://api.themoviedb.org/3/watch/providers/movie?language=pt-BR&watch_region=BR",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export default async function AllMovieProviders() {
  const data: MovieProviders = await getAllMovieProviders();
  return (
    <div className="w-full overflow-scroll">
      {data?.results.map((value, index) => (
        <p key={index}>{value.provider_name} - </p>
      ))}
    </div>
  );
}
