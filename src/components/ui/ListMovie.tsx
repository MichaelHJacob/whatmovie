import MovieCard from "@/components/ui/MovieCard";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

type ListMovieProps = {
  data: ({ recommended?: number } & DiscoverMovieType)[];
  id: string;
};

export default function ListMovie({ data, id }: Readonly<ListMovieProps>) {
  return (
    <ul id={id} className="listSpacing items-end">
      {data.map((value, index) => (
        <li
          id={id + String(index)}
          key={value.id}
          className="gridColSpanMovie relative"
        >
          <MovieCard data={value} />
        </li>
      ))}
    </ul>
  );
}
