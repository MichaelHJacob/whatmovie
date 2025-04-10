import ImageProfile from "@/app/movie/[movieId]/components/ui/People/ImageProfile";
import ImageProfileUnavailable from "@/components/skeleton/ImageProfileUnavailable";
import { PropsPeople } from "@/components/utils/types";

type ListPeopleProps = { id: string } & PropsPeople;

export default function ListPeople({
  cast = [],
  crew = [],
  id,
}: ListPeopleProps) {
  return (
    <ul
      id={id}
      className="ListSpacing no-scrollbar list-none rounded-2xl lg:auto-cols-[calc((100%-20*var(--gapLG))/21)]"
    >
      {cast.length >= 1 &&
        cast.map((value, index) => (
          <li id={id + String(index)} key={index} className="gridColSpanPeople">
            {typeof value.profile_path == "string" ? (
              <ImageProfile path={value.profile_path} alt={value.name} />
            ) : (
              <ImageProfileUnavailable alt={value.name} />
            )}

            <div className="mt-2 h-fit w-full text-center">
              <p className="label line-clamp-2">{value.name}</p>
              <p className="data line-clamp-2">{value.character}</p>
            </div>
          </li>
        ))}

      {crew.length >= 1 &&
        crew.map((value, index) => (
          <li
            id={id + String(index + cast.length)}
            key={index}
            className="gridColSpanPeople"
          >
            {typeof value.profile_path == "string" ? (
              <ImageProfile path={value.profile_path} alt={value.name} />
            ) : (
              <ImageProfileUnavailable alt={value.name} />
            )}
            <div className="mt-2 h-fit w-full text-center">
              <p className="label line-clamp-2">{value.name}</p>
              <p className="data line-clamp-2">{value.job}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
