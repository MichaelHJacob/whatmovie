import { CardMovie } from "@/components/comps";
import { MovieClient, MovieType} from "@/components/utils/types";

export function MapCardMovie({data}:{data: MovieClient[] | MovieType[]}) {
  return (
    <>
      {data.map((value) => (
        <li className="gridColSpanMovie" key={value.id}>
          <CardMovie data={value} />
        </li>
      ))}
    </>
  );
}
