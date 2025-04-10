import config from "@/components/utils/config";
import { PropsPeople } from "@/components/utils/types";

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
        className="light-shadow aspect-square w-full rounded-full object-cover contrast-[1.1]"
      />
    );
  }

  function ImageProfileUnavailable({ alt }: { alt: string }) {
    return (
      <div className="unavailable light-shadow relative aspect-square overflow-hidden rounded-full">
        <p className="textBtn absolute bottom-1 left-[50%] top-[10%] w-min translate-x-[-50%] text-wrap text-center text-xs text-opacity-30">
          imagem indisponível
        </p>
        <span className="absolute bottom-[15%] left-[50%] h-min w-[50%] translate-x-[-50%] overflow-hidden">
          <p className="textBtn line-clamp-1 h-auto overflow-hidden text-wrap text-center text-opacity-90">
            {alt}
          </p>
        </span>
      </div>
    );
  }
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
