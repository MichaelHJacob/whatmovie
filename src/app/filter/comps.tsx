import { CardMovie } from "@/components/comps";
import { MovieType } from "@/components/utils/types";

export function MapCardMovie({data}:{data: MovieType[]}) {
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
