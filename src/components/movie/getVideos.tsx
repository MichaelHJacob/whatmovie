import Videos from "@/components/movie/compsClient";
import config from "@/components/utils/config";
import { VideosType } from "@/components/utils/types";

async function getVideos(movieID: string) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    };
    const res = await fetch(
      config.apiUrlM + movieID + "/videos?language=pt-BR",
      options
    );
  
    if (!res.ok) {
      throw new Error("Falha ao buscar dados");
    }
    return res.json();
  }

  export default async function GetVideo({movieID}: {movieID: string}){
    const videos: VideosType = await getVideos(movieID);


    if(videos.results.length > 0){ return (<Videos videosArray={videos.results} />)} else {
    return(<span className="hidden">videos não disponível</span>)}
  }