import Link from "next/link";
import "@/app/globals.css";
import "./comp.css";
import { MovieType } from "./utils/types";
import CardMovie from "./cardMovie";

export function Header() {
  
  return (
    
    <header className="sticky top-0 z-50 w-full  background-blur h-12   p-safe-x ">
      <div className="w-60 ">
        <Link href="/" className="btnStyle mx-auto sm:w-52  min-w-[100px] ">
          <h1>WM - What Movie </h1>
        </Link>
      </div>
  
        <Link href={`/filter`} className="btnStyle  sm:w-52  min-w-[100px] ">
          <h2>Filtro</h2>
        </Link>
   
    </header>
  );
}


export function List({data, title}:{data: MovieType[], title: string}) {
 return(
  <>
  <h3 className="title mx-4 ">{title}</h3>

  <div className="grid grid-flow-col auto-cols-min gap-0 overflow-x-scroll overscroll-x-contain snap-mandatory snap-x scroll-pl-5 h-auto w-full pl-4 ">
   {data.map((value) => (
    <div key={value.id} className="snap-start  max-w-[200px] w-[20vw]  min-w-[182px]  ">
      <CardMovie data={value} />
    </div>
  ))}
  </div>

  </>
 )


}
