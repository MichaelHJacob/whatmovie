import MovieCard from "@/components/ui/MovieCard";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

type MovieCardMapProps = { data: DiscoverMovieType[] | null };

export default function MovieCardMap({ data }: Readonly<MovieCardMapProps>) {
  return (
    <>
      {data?.map((value) => (
        <li
          className="gridColSpanMovie h-auto xl:col-span-3 2xl:col-span-4"
          key={value.id}
        >
          <MovieCard data={value} />
        </li>
      ))}
    </>
  );
}
