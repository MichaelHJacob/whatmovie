"use server"
import { DiscoverType } from "@/components/utils/types";

async function getFilter(parameters: { [key: string]: string | string[] | undefined }) {
    let certification = "certification.lte=16&certification_country=BR";
    let voteCount = "";
  
    const page = () => {
        if (
          typeof parameters?.page === "string" &&
          Number(parameters?.page) > 1 &&
          Number(parameters?.page) <= 500
        ) {
          return parameters?.page;
        }
        return "1";
      };
  
    const vote = () => {
      return `${
        parameters?.vote_gte !== undefined
          ? "&vote_average.gte=" + parameters?.vote_gte
          : ""
      }${
        parameters?.vote_lte !== undefined
          ? "&vote_average.lte=" + parameters?.vote_lte
          : ""
      }`;
    };
  
    const genres = () => {
      if (typeof parameters?.g === "string") {
        let genres = parameters?.g.split(",");
        if (
          genres.includes("27" || "36" || "9648" || "10749" || "53" || "10752")
        ) {
          certification = "";
          return `&with_genres=${encodeURIComponent(parameters?.g)}`;
        } else {
          return `&with_genres=${encodeURIComponent(parameters?.g)}`;
        }
      } else {
        return "";
      }
    };
  
    const releaseDate = () => {
      let date: Date = new Date();
      return `&primary_release_date.lte=${date.getFullYear()}-${
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
    };
  
    const providers = () => {
      if (typeof parameters?.p === "string") {
        return `&with_watch_providers=${encodeURIComponent(parameters?.p)}`;
      } else {
        return "";
      }
    };
  
    const sortBy = () => {
      switch (parameters?.sort) {
        case "popularity":
        case "revenue":
          return `${parameters?.sort}.desc`;
  
        case "release_date":
          return `primary_${parameters?.sort}.desc`;
  
        case "vote_average":
          voteCount = "&vote_count.gte=500";
          return `${parameters?.sort}.desc`;
  
        default:
          return "popularity.desc";
      }
    };
  
    let url = `${process.env.DB_API_URL_F}discover/movie?${certification}&include_adult=false&include_video=false&language=pt-BR&page=${page()}${releaseDate()}&region=BR&sort_by=${sortBy()}${vote()}${voteCount}&watch_region=BR${genres()}&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy${providers()}`;
  
    console.log("url server ",url)
  
    const res = await fetch(url, {
      next : {revalidate: 3600},
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Falha ao buscar dados");
    }
    return res.json();
  }
export async function fetchMovies( parameters: { [key: string]: string | undefined | string[]}) {
    const data: DiscoverType = await getFilter(parameters);
    return JSON.parse(JSON.stringify(data))
}

