import Link from "next/link";
import { CreditsType, MovieClient, MovieType, RecommendationsMovieRate } from "./utils/types";
import { ReactNode } from "react";

export function ListMovie({
  data,
  id,
}: {
  data: RecommendationsMovieRate[];
  id: string;
}) {
  return (
    <ul id={id} className="ListSpacing list-none no-scrollbar">
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

export function ListPeople({ data, id }: { data: CreditsType; id: string }) {
  return (
    <ul
      id={id}
      className="ListSpacing lg:auto-cols-[calc((100%-20*var(--gapLG))/21)]  list-none no-scrollbar rounded-2xl"
    >
      {data.cast.length >= 1 &&
        data.cast.map((value, index) => (
          <li
            id={id + String(index)}
            key={index}
            className="gridColSpanPeople "
          >
            {typeof value.profile_path == "string" ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${value.profile_path}`}
                alt={value.name}
                height={200}
                width={200}
                sizes="150px"
                className="rounded-full w-full  aspect-square  object-cover"
              />
            ) : (
              <div
                className="rounded-full overflow-hidden aspect-square
            unavailable relative"
              >
                <p className="filter-TextBtn text-opacity-30 text-center text-xs  text-wrap  w-min  absolute bottom-1 left-[50%] translate-x-[-50%] top-[10%]">
                  imagem indisponível
                </p>
                <span className="overflow-hidden h-min w-[50%]  absolute left-[50%] translate-x-[-50%] bottom-[15%]">
                  <p className="filter-TextBtn text-opacity-90 line-clamp-1 h-auto   overflow-hidden text-center  text-wrap    ">
                    {value.name}
                  </p>
                </span>
              </div>
            )}

            <div className="w-full mt-2 text-center h-fit ">
              <p className="label line-clamp-2">{value.name}</p>
              <p className="data line-clamp-2">{value.character}</p>
            </div>
          </li>
        ))}

      {data.crew.length >= 1 &&
        data.crew.map((value, index) => (
          <li
            id={id + String(index + data.cast.length)}
            key={index}
            className="gridColSpanPeople"
          >
            {typeof value.profile_path == "string" ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${value.profile_path}`}
                alt={value.name}
                height={200}
                width={200}
                sizes="150px"
                className="rounded-full w-full  aspect-square  object-cover"
              />
            ) : (
              <div
                className="rounded-full overflow-hidden aspect-square
            unavailable relative"
              >
                <p className="filter-TextBtn text-opacity-30 text-center text-xs  text-wrap  w-min  absolute bottom-1 left-[50%] translate-x-[-50%] top-[10%]">
                  imagem indisponível
                </p>
                <span className="overflow-hidden h-min w-[50%]  absolute left-[50%] translate-x-[-50%] bottom-[15%]">
                  <p className="filter-TextBtn text-opacity-90 line-clamp-1 h-auto   overflow-hidden text-center  text-wrap    ">
                    {value.name}
                  </p>
                </span>
              </div>
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

export function CardMovie({ data }: { data: MovieClient | MovieType}) {
  if (typeof data.poster_path == "string") {
    return (
      <Link href={`/movie/${data.id}`} target="_top" className=" w-full   ">
        <img
          src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
          alt={data.title}
          height={330}
          width={220}
          sizes="150px"
          className="rounded-lg w-full   shadow-xl shadow-black/30"
        />
      </Link>
    );
  } else {
    return (
      <Link href={`/movie/${data.id}`} className=" w-full   ">
        <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden bg-gradient-to-b from-solid-pink-950/5 to-neutral-500/15  break-words  shadow-xl shadow-black/30 aspect-[18/27]">
          <p className="filter-TextBtn text-solid-pink-950/30  text-wrap place-items-center w-min text-center ">
            imagem indisponível
          </p>
          <p className="filter-TextBtn  font-extrabold text-2xl  text-wrap place-items-center  ">
            {data.title}
          </p>
        </div>
      </Link>
    );
  }
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 xs:py-[1rem] lg:py-6 min-h-11  ">
      <h3 className="subTitle  ">{children}</h3>
    </div>
  );
}
