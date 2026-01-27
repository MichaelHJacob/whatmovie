import Link from "next/link";

import { POSTER } from "@/config/imageConfig";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

type MovieCardProps = { data: DiscoverMovieType };

export default function MovieCard({ data }: Readonly<MovieCardProps>) {
  return (
    <Link
      href={`/movie/${data.id}`}
      className="relative block after:absolute after:inset-0 after:block after:rounded-xl after:shadow-card max-xs:after:shadow-card-subtle"
    >
      {typeof data.poster_path == "string" ? (
        <img
          src={POSTER.w342 + data.poster_path}
          alt={data.title}
          className="block aspect-[2/3_auto] rounded-xl bg-base-minimal"
        />
      ) : (
        <div className="unavailable flex aspect-[2/3] h-full w-full flex-col items-center justify-between overflow-hidden break-words rounded-xl pb-10 pt-5">
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
