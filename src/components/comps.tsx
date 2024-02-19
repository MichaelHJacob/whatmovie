import Link from "next/link";
import { CreditsType, MovieType } from "./utils/types";
import { ReactNode, Suspense } from "react";
import Search from "./compsSearch";

export function Header() {
  return (
    <header className=" w-full max-w-screen-2xl  top-0 fixed left-1/2 translate-x-[-50%] z-[1000] overflow-visible ">
      <nav
        className="w-full h-11 z-[2000]  backdrop-saturate-150   backdrop-blur-xl 
      px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl 
      mx-auto  flex justify-start items-center xl:rounded-lg   transition-all duration-700 overflow-visible  has-[:open]:bg-black invert-0
     
      gap-[var(--gap)] 
    xs:gap-[var(--gapXS)] 
    md:gap-[var(--gapMD)] 
    lg:gap-[var(--gapLG)] "
      >
        <Suspense><Search /></Suspense>

        <Link
          href={`/filter`}
          className=" main-backBtn bg-transparent main-TextBtn   overflow-hidden  backdrop-filter-none w-36 justify-center px-0
          peer-open:w-0  order-3"
        >
          <h2>Filtro</h2>
        </Link>

        <div className="w-full max-sm:peer-open:w-0 max-sm:peer-open:opacity-0 transition-all duration-700 overflow-hidden">
          <Link
            href="/"
            className="btn-link text-xl  font-bold whitespace-nowrap w-auto "
          >
            <h1>What Movie</h1>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl w-full h-auto mx-auto   ">{children}</div>;
}

export function BlockContainer({ children }: { children: ReactNode }) {
  return <div className="blockContainer ">{children}</div>;
}

export function ListMovie({ data }: { data: MovieType[] }) {
  return (
    <ul className="ListSpacing list-none no-scrollbar ">
      {data.map((value) => (
        <li
          key={value.id}
          className="gridColSpanMovie"
        >
          <CardMovie data={value} />
        </li>
      ))}
    </ul>
  );
}

export function ListPeople({ data }: { data: CreditsType }) {
  return (
    <ul className="ListSpacing list-none no-scrollbar ">
      {data.cast.length >= 1 &&
        data.cast.map((value, index) => (
          <li
            key={index}
            className="h-min gridColSpanPeople "
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
            key={index}
            className="col-span-3 xs:col-span-3 md:col-span-2 lg:col-span-3 snap-start h-min"
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

export function CardInformation({ children }: { children: ReactNode }) {
  return (
    <dl
      className="bg-Surface rounded-lg px-4 pt-4 pb-2  flex flex-col  
   col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 snap-start"
    >
      {children}
    </dl>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 xs:py-[1rem] lg:py-6  ">
      <h3 className="subTitle  ">{children}</h3>
    </div>
  );
}

export async function CardMovie({ data }: { data: MovieType }) {
  if (typeof data.poster_path == "string") {
    return (
      <Link href={`/movie/${data.id}`} className=" w-full   ">
        <img
          src={process.env.DB_IMG_URL_M + data.poster_path}
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
            {data.title}{" "}
          </p>
        </div>
      </Link>
    );
  }
}

export function Break() {
  return (
    <hr className="border-2 border-solid border-Surface mx-[var(--p)] xs:mx-[var(--pXS)] lg:mx-[var(--pLG)] rounded-lg " />
  );
}

