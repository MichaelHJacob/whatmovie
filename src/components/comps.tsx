import Link from "next/link";
import { CreditsType, MovieType } from "./utils/types";
import { FaFilter } from "react-icons/fa6";
import { ReactNode } from "react";
import Image from "next/image";
// bg-onSurface2/10 
export function Header() {
  return (
    <header className="max-w-7xl w-full   top-0 fixed left-1/2 translate-x-[-50%]  z-50 blockContainer">
   
      <div className="w-full h-11 px-4  flex justify-between items-center rounded-lg bg-onSurface2/10 backdrop-blur-xl 
      ">
      
      <Link href="/" className="btnStyle   ">
        <h1>What Movie </h1>
      </Link>
 
      <Link href={`/filter`} className="btnStyle ">
        <FaFilter />
        <h2>Filtro</h2>
      </Link>
      </div>
    </header>
  );
}


export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl w-full h-auto mx-auto  ">


      {children}
    </div>
  );
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
          {/* hover:-translate-y-[-5%] hover:scale-105 transition ease-in-out delay-200 duration-700 */}
          <CardMovie data={value} />
        </li>
      ))}

    </ul>
  );
}
// export function ListPeople({ data }: { data: CreditsType }) {
//   return(
//     "lista de pessoas"
//   )
// }

export function ListPeople({ data }: { data: CreditsType }) {
  return (
    <ul className="ListSpacing list-none ">
      {data.cast.length >= 1 && data.cast.map((value, index) => (
        <li key={index} className="col-span-3 xs:col-span-3 md:col-span-2 lg:col-span-3  snap-start h-min ">

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

      {data.crew.length >= 1 && data.crew.map((value, index) => (
        <li key={index} className="col-span-3 xs:col-span-3 md:col-span-2 lg:col-span-3 snap-start h-min">

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

export function CardInformation ({children} : {children: ReactNode}) {
 return(
  <dl className="bg-Surface rounded-lg px-4 pt-4 pb-2  flex flex-col  
   col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 snap-start">

    {children}

</dl>

 )
}


export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 xs:py-[1rem] lg:py-6  ">
      <h3 className="subTitle p-0.5 text-onBackground1 text-lg font-semibold leading-4  ">{children}</h3>
    </div>
  );
}

export function SubTitle2({ children }: { children: ReactNode }) {
  return (
    <div className="py-1 xs:py-2  lg:py-3 ">
      {/* <h4 className="subTitle p-0.5 text-onBackground1 text-lg font-normal leading-4  ">{children}</h4> */}
      <h4 className="subTitle p-0.5 text-Background text-lg font-normal leading-4 md:text-center line-clamp-2 ">{children}</h4>
    </div>
  );
}

export async function CardMovie({ data }: { data: MovieType }) {
  return (
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
  );
}
