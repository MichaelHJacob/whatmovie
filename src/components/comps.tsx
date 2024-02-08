import Link from "next/link";
import { CreditsType, MovieType } from "./utils/types";
import { FaFilter } from "react-icons/fa6";
import { ReactNode } from "react";


export function Header() {
  return (
    <header className=" w-full max-w-screen-2xl  top-0 fixed left-1/2 translate-x-[-50%] z-[1000] ">
      <div className="w-full h-11 z-[2000] bg-Background/10  backdrop-saturate-150   backdrop-blur-xl px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl mx-auto  flex justify-between items-center xl:rounded-lg  has-[:focus]:bg-Background/95 transition-all duration-700 has-[:focus]:rounded-none group ">
        <Link
          href="/"
          className="btn-link text-xl  font-bold whitespace-nowrap w-min  max-sm:group-has-[:focus]:w-0 max-sm:group-has-[:focus]:opacity-0 transition-all duration-700 overflow-hidden"
        >
          <h1>What Movie</h1>
        </Link>
        <div className="flex gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG] h-full has-[:focus]:max-sm:w-full max-sm:w-full transition-all duration-700">

          <Link
            href={`/filter`}
            className="main-backBtn bg-transparent main-TextBtn  order-3 max-sm:peer-focus:hidden backdrop-filter-none "
          >
            {/* <FaFilter /> */}
            <h2>Filtro</h2>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl w-full h-auto mx-auto   ">{children}</div>;
}

export function BlockContainer({ children }: { children: ReactNode }) {
  return <div className="blockContainer  ">{children}</div>;
}

export function ListMovie({ data }: { data: MovieType[] }) {
  return (
    <ul className="ListSpacing list-none ">
      {data.map((value) => (
        <li
          key={value.id}
          className="col-span-5 xs:col-span-5 md:col-span-3 lg:col-span-4 snap-start   "
        >
          <CardMovie data={value} />
        </li>
      ))}
    </ul>
  );
}

export function ListPeople({ data }: { data: CreditsType }) {
  return (
    <ul className="ListSpacing list-none ">
      {data.cast.length >= 1 &&
        data.cast.map((value, index) => (
          <li
            key={index}
            className="col-span-3 xs:col-span-3 md:col-span-2 lg:col-span-3  snap-start h-min "
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
              <div className="rounded-full overflow-hidden aspect-square">
                <Unavailable  name={value.name}/>
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
              <Unavailable  name={value.name}/>
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

export function SubTitle2({ children }: { children: ReactNode }) {
  return (
    <div className="py-1 xs:py-2  lg:py-3 ">
      {/* <h4 className="subTitle p-0.5 text-onBackground1 text-lg font-normal leading-4  ">{children}</h4> */}
      <h4 className="subTitle p-0.5 text-Background text-lg font-normal leading-4 md:text-center line-clamp-2  ">
        {children}
      </h4>
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
    console.log(data.poster_path);
    console.log(data.title);
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
export function Unavailable({name}: {name: string}) {
  return (
    <div className=" flex flex-col justify-between items-center pb-10 pt-5  w-full h-full  bg-gradient-to-b from-solid-pink-950/5 to-neutral-500/15  object-cover  break-words ">
      <p className="filter-TextBtn text-solid-pink-950/30  text-wrap  w-min text-center ">
        imagem indisponível
      </p>
      <p className="filter-TextBtn  font-extrabold text-2xl  text-wrap  line-clamp-1  ">
        {name}
      </p>
    </div>
  );
}
