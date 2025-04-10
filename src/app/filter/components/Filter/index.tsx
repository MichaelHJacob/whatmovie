import FilterMenu from "@/app/filter/components/Filter/FilterMenu";
import config from "@/components/utils/config";
import {
  ListGenres,
  MovieProviders,
} from "@/components/utils/types";

async function getListGenres() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(`${config.apiUrl}genre/movie/list?language=pt-BR&watch_region=BRappend_to_response=providers`, options)

  if (!res.ok) {
    throw new Error("Falha ao buscar dados")
  }

  return res.json()
}

async function getMovieProviders() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(`${config.apiUrl}watch/providers/movie?language=pt-BR&watch_region=BR`, options)

  if (!res.ok) {
    throw new Error("Falha ao buscar dados")
  }

  return res.json()
}
type FilterProps = { children: React.ReactNode };

export default async function Filter({ children }: FilterProps) {
  const listGenres: ListGenres = await getListGenres();
  const listProviders: MovieProviders = await getMovieProviders()
 
  return(
    <FilterMenu  filters={{listGenres, listProviders }} >
      {children}
    </FilterMenu>
  )
}

