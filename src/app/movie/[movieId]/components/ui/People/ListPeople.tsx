import { PropsPeople } from "@/components/utils/types";
import ImageProfileUnavailable from "@/components/skeleton/ImageProfileUnavailable";
import ImageProfile from "@/app/movie/[movieId]/components/ui/People/ImageProfile";

type ListPeopleProps = { id: string } & PropsPeople;

export default function ListPeople({
  cast = [],
  crew = [],
  id,
}: ListPeopleProps) {

  return (
    <ul
      id={id}
      className="ListSpacing lg:auto-cols-[calc((100%-20*var(--gapLG))/21)] list-none no-scrollbar rounded-2xl"
    >
      {cast.length >= 1 &&
        cast.map((value, index) => (
          <li id={id + String(index)} key={index} className="gridColSpanPeople">
            {typeof value.profile_path == "string" ? (
              <ImageProfile path={value.profile_path} alt={value.name} />
            ) : (
              <ImageProfileUnavailable alt={value.name} />
            )}

            <div className="w-full mt-2 text-center h-fit ">
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
            <div className="w-full mt-2 text-center h-fit">
              <p className="label line-clamp-2">{value.name}</p>
              <p className="data line-clamp-2 ">{value.job}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}