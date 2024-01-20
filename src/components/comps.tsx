import Link from "next/link";
import { CreditsType, MovieType } from "./utils/types";
import { FaFilter } from "react-icons/fa6";
import { ButtonHTMLAttributes, Children, ClassAttributes, JSX, ReactNode } from "react";
import Image from "next/image";
//
export function Header() {
  return (
    <header className=" w-full max-w-screen-2xl  top-0 fixed left-1/2 translate-x-[-50%] z-50 ">
     
      <div
        className="w-full h-11  bg-Background/10 backdrop-saturate-150   backdrop-blur-xl px-[var(--p)] xs:px-[var(--pXS)] lg:px-[var(--pLG)] max-w-7xl mx-auto  flex justify-between items-center xl:rounded-lg  ">
        <Link href="/" className="btn-link text-xl  font-bold   ">
          <h1>What Movie </h1>
        </Link>
        <div className="flex gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG] h-full w-min justify-between ">
          <Link href={`/filter#Movies`} className="btn-link  font-semibold">
            {/* <FaFilter /> */}
            <h2>Filtro</h2>
          </Link>
          <Link href={`/filter#Movies`} className="btn-link font-semibold">
            {/* <FaFilter /> */}
            <h2>Filtro</h2>
          </Link>
          <Link href={`/filter#Movies`} className="btn-link font-semibold  ">
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
            <Image
              src={`https://image.tmdb.org/t/p/w500${value.profile_path}`}
              alt={value.name}
              height={200}
              width={200}
              sizes="150px"
              className="rounded-full w-full  aspect-square  object-cover"
            />
            <div className="w-full mt-2 text-center h-fit ">
              <p className="emphasis line-clamp-2">{value.name}</p>
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
            <Image
              src={`https://image.tmdb.org/t/p/w500${value.profile_path}`}
              alt={value.name}
              height={200}
              width={200}
              sizes="150px"
              className="rounded-full w-full  aspect-square  object-cover"
            />
            <div className="w-full mt-2 text-center h-fit">
              <p className="emphasis line-clamp-2">{value.name}</p>
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
  return (<>
    <Link href={`/movie/${data.id}`} className=" w-full   ">
      <Image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
        height={330}
        width={220}
        sizes="150px"
        className="rounded-lg w-full   shadow-xl shadow-black/30"
      />
    </Link>
    </>
  );
}

export function Break() {
  return (
    <hr className="border-2 border-solid border-Surface mx-[var(--p)] xs:mx-[var(--pXS)] lg:mx-[var(--pLG)] rounded-lg "/>
  )
}

