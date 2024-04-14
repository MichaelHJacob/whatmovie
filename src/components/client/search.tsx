"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResult, ListGenres } from "../utils/types";
import Link from "next/link";
import { BlockContainer } from "../frame";


export default function Search() {
  const searchParams = useSearchParams();
  const [dataGenres, setGenres] = useState<ListGenres | null>(null);
  const [data, setData] = useState<SearchResult[] | null>(null);
  const [term, setTerm] = useState("");
  let timeGet = useRef<ReturnType<typeof setInterval> | null>(null);
  let details = useRef<HTMLDetailsElement | null>(null);
  let input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  function handleSearch(term: string) {
    setTerm(term);
    timeGet.current && clearTimeout(timeGet.current);
    if (term.length > 1 && term !== " ") {
      timeGet.current = setTimeout(() => {
        getData(term);
      }, 500);
    }
  }

  function formatDate(date: string) {
    const d = new Date(date);
    return (
      <span className="lowercase">
        {d.toLocaleDateString("pt-BR", { dateStyle: "short" })}
      </span>
    );
  }

  function formatGenres(genres: number[]) {
    let result = genres.map((value) =>
      dataGenres?.genres.find((element) => element.id == value)
    );
    return result.map((term) => term?.name).join(", ");
  }

  function getData(getTerm: string) {
    const params = new URLSearchParams(searchParams);
    params.set("query", getTerm);

    fetch(`/api/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }

  return (
    <details
      ref={details}
      onMouseLeave={() => {
        if (details.current !== null) {
          if (details.current.hasAttribute("open")) {
            details.current.toggleAttribute("open");
            input.current && input.current.blur();
          }
        }
      }}
      className="relative sm:open:w-[80vw] w-[50vw] min-w-8  sm:min-w-60 sm:max-w-96 open:w-full   transition-all duration-300 peer order-2 open:mx-[calc(var(--gap)*-1)] xs:open:mx-[calc(var(--gapXS)*-1)] select-none group"
    >
      <summary
        onKeyUp={(e) => {
          if (
            input.current !== undefined &&
            input.current?.focus &&
            e.key == " "
          ) {
            if (
              details.current !== undefined &&
              details.current?.hasAttribute("open")
            ) {
              e.preventDefault();
            }
          }
        }}
        className=" cursor-pointer   sm:pl-[--pXS] lg:pl-[--pLG] flex relative z-10 group-open:gap-[var(--gap)] group-open:xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]"
      >
        <span
          className=" group-open:w-11 aspect-square w-0 h-11 inline opacity-0 group-open:opacity-100
      sm:bg-[url('/close.svg')] bg-[url('/toLeft.svg')] bg-[length:12px_12px] bg-[center_center]  bg-no-repeat  rounded-lg main-TextBtn main-backBtn bg-Surface80/30 shadow-lg shadow-transparent px-0"
        ></span>
        <label htmlFor="search" className=" inline w-full cursor-pointer">
          <input
            ref={input}
            onClick={() => {
              if (details.current !== null) {
                if (details.current.hasAttribute("open") == false) {
                  details.current.toggleAttribute("open");
                }
              }
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter" && input.current?.value == "") {
                setData([]);
              }
              if (
                e.key == "Enter" &&
                input.current != undefined &&
                input.current?.value.length >= 2
              ) {
                getData(input.current?.value);
              }
            }}
            type="search"
            className="w-full h-11 bg-[url('/lupa.svg')] bg-[length:12px_12px] bg-[center_left_1.3rem]  bg-no-repeat pl-11  max-sm:w-full  rounded-lg main-TextBtn main-backBtn placeholder:main-TextBtn bg-Surface80/30 shadow-lg shadow-transparent peer order-2 hover:shadow-onBackground2/20 focus:bg-Surface80"
            id="search"
            placeholder="Buscar por filme"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            value={term}
          />
        </label>
      </summary>

      <div
        onTouchMove={() => {
          input.current && input.current.blur();
        }}
        className="   max-sm:fixed absolute top-0 left-0 sm:left-1 z-0  overflow-y-auto h-dvh   overscroll-contain no-scrollbar box-content sm:w-[calc(100%+var(--pXS))] md:w-[calc(100%+var(--pMD))] lg:w-[calc(100%+var(--pLG))] xl:pr-[calc((100vw-1280px)/2)] max-sm:w-screen bg-Background/80 backdrop-contrast-100  backdrop-saturate-200 backdrop-blur-2xl animate-show  duration-300 bg-gradient-to-b from-Background "
      >
        <div className="bg-gradient-to-b  from-Background/80  via-Background/50 bg-transparent  sticky top-0  left-0 h-[5.5rem] backdrop-blur-[1px] w-full   backdrop-saturate-[1.2]   z-10 ">
          <div className="bg-gradient-to-b from-Background/80  via-Background/70 to-transparent  absolute top-0  left-0 h-11 backdrop-blur-[2px] w-full   z-10 " />
        </div>
        <BlockContainer>
          <ul className="h-full w-full flex justify-start flex-col items-start gap-[var(--gap)] xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]  box-border">
            {data !== null &&
              data?.map((value) => {
                return (
                  <li
                    key={value.id}
                    onClick={() => {
                      if (details.current !== null) {
                        if (details.current.hasAttribute("open")) {
                          details.current.toggleAttribute("open");
                        }
                      }
                    }}
                    className="    list-backBtn    group/list"
                  >
                    <Link
                      href={`/movie/${value.id}`}
                      className=" flex h-full w-full group "
                    >
                      {value.poster_path ? (
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w342` +
                            value.poster_path
                          }
                          alt={value.title}
                          className=" aspect-[18/27] h-full transition-all duration-300 rounded-lg group-hover/list:rounded-r-none"
                        />
                      ) : (
                        <div className=" h-full aspect-[18/27]  min-w-min transition-all duration-300 rounded-lg group-hover/list:rounded-r-none   overflow-hidden  relative  justify-between items-center    bg-gradient-to-b from-solid-pink-950/5 to-neutral-500/15  object-cover">
                          <p className="filter-TextBtn text-solid-pink-950/30  text-wrap  w-min text-xs absolute top-1 left-[50%] translate-x-[-50%]  ">
                            imagem indisponível
                          </p>
                        </div>
                      )}
                      <dl className="flex flex-col justify-center items-start px-4 pt-4 pb-2 w-full ">
                        <dt className="label line-clamp-1">{value.title}</dt>
                        {value.release_date && (
                          <dd className="data ">
                            {formatDate(value.release_date)}
                          </dd>
                        )}
                        {value.genre_ids && (
                          <dd className="data line-clamp-1">
                            {dataGenres && formatGenres(value.genre_ids)}
                          </dd>
                        )}
                      </dl>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </BlockContainer>
      </div>
    </details>
  );
}
