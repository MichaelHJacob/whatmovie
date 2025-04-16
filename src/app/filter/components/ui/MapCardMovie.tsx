import CardMovie from "@/components/ui/CardMovie";
import { MovieClient, MovieType } from "@/types/globalTypes";

type MapCardMovieProps = { data: MovieClient[] | MovieType[] };

export default function MapCardMovie({ data }: MapCardMovieProps) {
  return (
    <>
      {data.map((value) => (
        <li
          className="gridColSpanMovie h-auto xl:col-span-3 2xl:col-span-4"
          key={value.id}
        >
          <CardMovie data={value} />
        </li>
      ))}
    </>
  );
}
