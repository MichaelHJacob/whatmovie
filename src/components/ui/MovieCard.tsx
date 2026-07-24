import Link from "next/link";

import { formatToIdSlug } from "@/lib/utils/formatToIdSlug";
import { imgBaseUrlType } from "@/lib/utils/getImageBaseUrl";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

type MovieCardProps = {
  data: DiscoverMovieType;
  baseUrl: imgBaseUrlType;
};

export default function MovieCard({ data, baseUrl }: Readonly<MovieCardProps>) {
  return (
    <Link
      href={`/${formatToIdSlug(data.id, data.title)}`}
      className="relative block aspect-[2/3_auto] h-full after:absolute after:inset-0 after:block after:rounded-xl after:shadow-card max-xs:after:shadow-card-subtle"
    >
      {typeof data.poster_path == "string" ? (
        <img
          src={baseUrl.poster.p300 + data.poster_path}
          alt={data.title}
          loading="lazy"
          fetchPriority="low"
          className="block h-full w-full rounded-xl bg-base-minimal"
        />
      ) : (
        <div className="bg-gradient-default flex aspect-[2/3] h-full w-full flex-col items-center justify-between overflow-hidden break-words rounded-xl pb-10 pt-5">
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
