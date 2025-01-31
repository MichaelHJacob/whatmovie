"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResult, ListGenres } from "@/components/utils/types";
import Link from "next/link";
import config from "@/components/utils/config";

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
      className="relative sm:open:w-[80vw] w-[50vw] min-w-8 sm:w-auto sm:min-w-fit open:w-full transition-all duration-300 peer order-2 open:mx-[calc(var(--gap)*-1)] xs:open:mx-[calc(var(--gapXS)*-1)] select-none group"
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
        className=" cursor-pointer sm:pl-[--pXS] lg:pl-[--pLG] flex relative z-10 group-open:gap-[var(--gap)] group-open:xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]"
      >
        <span
          className=" group-open:w-11 aspect-square w-0 h-11 inline opacity-0 group-open:opacity-100
      sm:bg-[url('/icons/close.svg')] bg-[url('/icons/toLeft.svg')] bg-[length:12px_12px] bg-center  bg-no-repeat  rounded-lg backBtn  shadow-lg shadow-transparent px-0"
        />

        <label
          htmlFor="search"
          className=" inline-flex items-center justify-start w-full cursor-pointer "
        >
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
            autoComplete="off"
            className="header-backBtn textBtn text-base   pl-9 bg-[url('/icons/lupa.svg')] bg-[length:12px_12px] bg-[center_left_0.9rem]  bg-no-repeat   max-sm:w-full  rounded-lg    shadow-lg shadow-transparent peer order-2 
            group-open:bg-nightDew-200  group-open:w-full focus:bg-nightDew-200/80 placeholder:textBtn max-sm:placeholder:text-opacity-0 bg-nightDew-300"
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
        className="   max-sm:fixed absolute top-0 left-0 sm:left-1 z-0  overflow-y-auto h-dvh   overscroll-contain no-scrollbar box-content sm:w-[calc(100%+var(--pXS))] md:w-[calc(100%+var(--pMD))] lg:w-[calc(100%+var(--pLG))] xl:pr-[calc((100vw-1280px)/2)] max-sm:w-screen bg-nightDew-200/80 backdrop-contrast-100  backdrop-saturate-200 backdrop-blur-2xl animate-show  duration-300 bg-gradient-to-b from-nightDew-200 "
      >
        <div className="bg-gradient-to-b  from-nightDew-200/80  via-nightDew-200/50 bg-transparent  sticky top-0  left-0 h-[5.5rem] backdrop-blur-[1px] w-full   backdrop-saturate-[1.2]   z-10 ">
          <div className="bg-gradient-to-b from-nightDew-200/80  via-nightDew-200/70 to-transparent  absolute top-0  left-0 h-11 backdrop-blur-[2px] w-full   z-10 " />
        </div>
        <div>
          <ul className="h-full w-full flex justify-start flex-col items-start gap-[var(--gap)] xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]  box-border blockContainer">
            {data !== null &&
              data
                ?.filter((value) => value.vote_count >= 100)
                .map((value) => {
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
                      className="list-backBtn group/list"
                    >
                      <Link
                        href={`/movie/${value.id}`}
                        className=" flex h-full w-full group "
                      >
                        {value.poster_path ? (
                          <img
                            src={
                              config.imgUrlS02 +
                              value.poster_path
                            }
                            alt={value.title}
                            className=" aspect-[18/27] h-full transition-all duration-300 rounded-lg group-hover/list:rounded-r-none"
                          />
                        ) : (
                          <div className=" h-full aspect-[18/27]  min-w-min transition-all duration-300 rounded-lg group-hover/list:rounded-r-none   overflow-hidden  relative  justify-between items-center unavailable  object-cover">
                            <p className="textBtn text-opacity-30  text-wrap  w-min text-xs absolute top-1 left-[50%] translate-x-[-50%]  ">
                              imagem indisponível
                            </p>
                          </div>
                        )}
                        <dl className="flex flex-col justify-center items-start px-4  w-full ">
                          <dt className="label line-clamp-1 leading-normal py-0">{value.title}</dt>
                          {value.release_date && (
                            <dd className="data leading-normal py-0">
                              {formatDate(value.release_date)}
                            </dd>
                          )}
                          {value.genre_ids && (
                            <dd className="data line-clamp-1 leading-normal py-0">
                              {dataGenres && formatGenres(value.genre_ids)}
                            </dd>
                          )}
                        </dl>
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </details>
  );
}
