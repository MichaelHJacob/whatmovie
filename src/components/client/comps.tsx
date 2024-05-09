"use client";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { MovieType } from "../utils/types";

const BtnScrollTo = dynamic(() => import("./button"));

export function ListControl({
  id,
  length,
  children,
}: {
  id: string;
  length: number;
  children: ReactNode;
}) {
  const [enabler, setEnabler] = useState(false);

  function onMouse() {
    const element = document.getElementById(id);
    if (element !== null) {
      let width = element.getBoundingClientRect().right;
      let i = 0;
      do {
        let atual = document.getElementById(id + String(i));
        if (atual !== null) {
         
          if (atual.getBoundingClientRect().right > width || atual.getBoundingClientRect().left < 0) {
            setEnabler(true)
            i = length;
          }else{
            setEnabler(false)
          }
        }
        i++;
      } while (i < length);
    }
  }

  return (
    <div
      onMouseEnter={onMouse}
      className="relative blockContainer-x spacingShrinkerBlock-x group"
    >
      {enabler && <BtnScrollTo id={id} length={length} />}
      {children}
    </div>
  );
}

export function CardMovie({ data }: { data: MovieType }) {
  if (typeof data.poster_path == "string") {
    return (
      <a href={`/movie/${data.id}`} className=" w-full   ">
        <img
          src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
          alt={data.title}
          height={330}
          width={220}
          sizes="150px"
          className="rounded-lg w-full   shadow-xl shadow-black/30"
        />
      </a>
    );
  } else {
    return (
      <a href={`/movie/${data.id}`} className=" w-full   ">
        <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden bg-gradient-to-b from-solid-pink-950/5 to-neutral-500/15  break-words  shadow-xl shadow-black/30 aspect-[18/27]">
          <p className="filter-TextBtn text-solid-pink-950/30  text-wrap place-items-center w-min text-center ">
            imagem indisponível
          </p>
          <p className="filter-TextBtn  font-extrabold text-2xl  text-wrap place-items-center  ">
            {data.title}{" "}
          </p>
        </div>
      </a>
    );
  }
}
