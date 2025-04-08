import  CardMovie from "@/components/ui/CardMovie";
import { MovieClient, MovieType} from "@/components/utils/types";

type MapCardMovieProps = { data: MovieClient[] | MovieType[] };

export default function MapCardMovie({ data }: MapCardMovieProps) {
  return (
    <>
      {data.map((value) => (
        <li className="gridColSpanMovie xl:col-span-3 2xl:col-span-4 h-auto " key={value.id}>
          <CardMovie data={value} />
        </li>
      ))}
    </>
  );
}
