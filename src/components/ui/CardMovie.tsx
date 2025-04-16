import Link from "next/link";

import config from "@/config/apiConfig";
import { MovieClient, MovieType } from "@/types/globalTypes";

type CardMovieProps = { data: MovieClient | MovieType };

export default function CardMovie({ data }: CardMovieProps) {
  return (
    <Link href={`/movie/${data.id}`} target="_top">
      {typeof data.poster_path == "string" ? (
        <img
          src={`${config.imgUrlS}${data.poster_path}`}
          alt={data.title}
          className="mid-shadow block aspect-[2/3_auto] w-full rounded-lg bg-nightDew-300"
        />
      ) : (
        <div className="unavailable mid-shadow flex aspect-[2/3] h-full w-full flex-col items-center justify-between overflow-hidden break-words rounded-lg pb-10 pt-5">
          <p className="textBtn w-min text-wrap text-center text-opacity-30">
            imagem indisponível
          </p>
          <p className="textBtn text-wrap text-2xl font-extrabold">
            {data.title}
          </p>
        </div>
      )}
    </Link>
  );
}
