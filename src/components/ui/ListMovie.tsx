import CardMovie from "@/components/ui/CardMovie";
import { MovieType, RecommendationsMovieRate } from "@/components/utils/types";

type ListMovieProps = {
  data: RecommendationsMovieRate[] | MovieType[];
  id: string;
};

export default function ListMovie({ data, id }: ListMovieProps) {
  return (
    <ul id={id} className="ListSpacing items-end">
      {data.map((value, index) => (
        <li
          id={id + String(index)}
          key={value.id}
          className="gridColSpanMovie relative"
        >
          <CardMovie data={value} />
        </li>
      ))}
    </ul>
  );
}
