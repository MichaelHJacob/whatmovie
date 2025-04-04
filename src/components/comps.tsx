import Link from "next/link";
import {
  MovieClient,
  MovieType,
  PropsPeople,
  RecommendationsMovieRate,
} from "@/components/utils/types";
import { ReactNode, Suspense } from "react";
import Search from "@/components/client/search";
import config from "@/components/utils/config";

export function ListMovie({
  data,
  id,
}: {
  data: RecommendationsMovieRate[] | MovieType[];
  id: string;
}) {
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

export function ListPeople({
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

export function CardMovie({ data }: { data: MovieClient | MovieType }) {
    return (
      <Link href={`/movie/${data.id}`} target="_top">
        {typeof data.poster_path == "string" ? (
          <img
            src={`${config.imgUrlS}${data.poster_path}`}
            alt={data.title}
            className="rounded-lg mid-shadow w-full aspect-[2/3_auto] block bg-nightDew-300"
          />
        ) : (
          <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden break-words aspect-[2/3] unavailable mid-shadow">
            <p className="textBtn text-opacity-30 text-wrap w-min text-center">
              imagem indisponível
            </p>
            <p className="textBtn font-extrabold text-2xl text-wrap">
              {data.title}
            </p>
          </div>
        )}
      </Link>
    );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 xs:py-[1rem] lg:py-6 min-h-11 blockContainer-x">
      <h3 className="subTitle">{children}</h3>
    </div>
  );
}

export function LabelH4({ children }: { children: ReactNode }) {
  return (
    <div className=" flex items-center min-h-11 w-fit">
      <h4 className="subTitle leading-normal text-base">{children}</h4>
    </div>
  );
}

export function NavBar({ fixed, dark }: { fixed?: boolean; dark?: boolean }) {
  return (
    <header
      className={`w-full top-0 left-0 z-[1000] overflow-visible backdrop-blur-md ${
        dark ? "bg-nightDew-700/30" : "bg-nightDew-200/80"
      } ${fixed ? "fixed" : "absolute"}`}
    >
      <nav className="w-full h-11 z-[2000] px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl mx-auto  flex justify-start items-center   transition-all duration-700 overflow-visible gap-[var(--gap)] xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]">
        <Suspense>
          <Search />
        </Suspense>

        <Link
          href={`/filter`}
          target="_top"
          className={`header-backBtn overflow-hidden  min-w-fit  justify-start peer-open:w-0 peer-open:px-0 peer-open:min-w-0 peer-open:opacity-0 opacity-100 order-3 ${
            dark && "hover:bg-opacity-10"
          }`}
        >
          <img
            src="/icons/filterIcon.svg"
            className={`w-6 h-6 ${dark && "invert"}`}
            width={24}
            height={24}
          />
          <h2
            className={`textBtn ${
              dark ? "text-nightDew-100" : "text-nightDew-700"
            }`}
          >
            Filtro
          </h2>
        </Link>

        <div className="w-full max-sm:peer-open:w-0 max-sm:peer-open:opacity-0 transition-all duration-700 overflow-hidden">
          <Link
            href="/"
            className={`w-auto flex items-center gap-2
         `}
          >
            <img
              src="/logo/wmIcon.svg"
              className={`w-5 h-5 ${dark && "invert"}`}
              alt="What Movie Logo"
              width={20}
              height={20}
            />
            <h1
              className={`tracking-wider whitespace-nowrap text-lg font-logo font-[700] antialiased ${
                dark ? "text-nightDew-100" : "text-nightDew-700 textShadow"
              }`}
            >
              What Movie
            </h1>
          </Link>
        </div>
      </nav>
    </header>
  );
}
