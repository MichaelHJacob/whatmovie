import {
  MovieClient,
  MovieType
} from "@/components/utils/types";
import Link from "next/link";
import config from "@/components/utils/config";

type CardMovieProps = {  data: MovieClient | MovieType  };

export default function CardMovie({ data  }: CardMovieProps) {
  return (
    <Link href={`/movie/${data.id}`} target="_top">
      {typeof data.poster_path == "string" ? (
        <img
          src={`${config.imgUrlS}${data.poster_path}`}
          alt={data.title}
          className="rounded-lg mid-shadow w-full aspect-[2/3_auto] block bg-nightDew-300"
        />
      ) : (
        <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden break-words aspect-[2/3] unavailable mid-shadow">
          <p className="textBtn text-opacity-30 text-wrap w-min text-center">
            imagem indisponível
          </p>
          <p className="textBtn font-extrabold text-2xl text-wrap">
            {data.title}
          </p>
        </div>
      )}
    </Link>
  );
}