import {
  PropsPeople,
} from "@/components/utils/types";
import config from "@/components/utils/config";

export default function ListPeople({
  cast = [],
  crew = [],
  id,
}: PropsPeople & { id: string }) {
  function ImageProfile({ path, alt }: { path: string; alt: string }) {
    return (
      <img
        srcSet={`${config.imgUrlS02}${path}, https://image.tmdb.org/t/p/h632${path} 2x`}
        src={`${config.imgUrlS02}${path}`}
        alt={alt}
        loading="lazy"
        className="rounded-full w-full aspect-square object-cover light-shadow contrast-[1.1]"
      />
    );
  }

  function ImageProfileUnavailable({ alt }: { alt: string }) {
    return (
      <div className="rounded-full overflow-hidden aspect-square relative unavailable light-shadow">
        <p className="textBtn text-opacity-30 text-center text-xs  text-wrap  w-min  absolute bottom-1 left-[50%] translate-x-[-50%] top-[10%]">
          imagem indisponível
        </p>
        <span className="overflow-hidden h-min w-[50%]  absolute left-[50%] translate-x-[-50%] bottom-[15%]">
          <p className="textBtn text-opacity-90 line-clamp-1 h-auto   overflow-hidden text-center  text-wrap    ">
            {alt}
          </p>
        </span>
      </div>
    );
  }
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