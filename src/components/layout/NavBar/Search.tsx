"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import config from "@/components/utils/config";
import { ListGenres, SearchResult } from "@/components/utils/types";

export default function Search() {
  const searchParams = useSearchParams();
  const [dataGenres, setGenres] = useState<ListGenres | null>(null);
  const [data, setData] = useState<SearchResult[] | null>(null);
  const [term, setTerm] = useState("");
  const timeGet = useRef<ReturnType<typeof setInterval> | null>(null);
  const details = useRef<HTMLDetailsElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  function handleSearch(term: string) {
    setTerm(term);
    if (timeGet.current) {
      clearTimeout(timeGet.current);
    }
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
    const result = genres.map((value) =>
      dataGenres?.genres.find((element) => element.id == value),
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
            if (input.current) {
              input.current.blur();
            }
          }
        }
      }}
      className="group peer relative order-2 w-[50vw] min-w-8 select-none transition-all duration-300 open:mx-[calc(var(--gap)*-1)] open:w-full xs:open:mx-[calc(var(--gapXS)*-1)] sm:w-auto sm:min-w-fit sm:open:w-[80vw]"
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
        className="relative z-10 flex cursor-pointer group-open:gap-[var(--gap)] group-open:xs:gap-[var(--gapXS)] sm:pl-[--pXS] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)] lg:pl-[--pLG]"
      >
        <span className="backBtn inline aspect-square h-11 w-0 rounded-lg bg-[url('/icons/toLeft.svg')] bg-[length:12px_12px] bg-center bg-no-repeat px-0 opacity-0 shadow-lg shadow-transparent group-open:w-11 group-open:opacity-100 sm:bg-[url('/icons/close.svg')]" />

        <label
          htmlFor="search"
          className="inline-flex w-full cursor-pointer items-center justify-start"
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
            className="header-backBtn textBtn placeholder:textBtn peer order-2 rounded-lg bg-nightDew-300 bg-[url('/icons/lupa.svg')] bg-[length:12px_12px] bg-[center_left_0.9rem] bg-no-repeat pl-9 text-base shadow-lg shadow-transparent focus:bg-nightDew-200/80 group-open:w-full group-open:bg-nightDew-200 max-sm:w-full max-sm:placeholder:text-opacity-0"
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
          if (input.current) {
            input.current.blur();
          }
        }}
        className="no-scrollbar absolute left-0 top-0 z-0 box-content h-dvh animate-show overflow-y-auto overscroll-contain bg-nightDew-200/80 bg-gradient-to-b from-nightDew-200 backdrop-blur-2xl backdrop-contrast-100 backdrop-saturate-200 duration-300 max-sm:fixed max-sm:w-screen sm:left-1 sm:w-[calc(100%+var(--pXS))] md:w-[calc(100%+var(--pMD))] lg:w-[calc(100%+var(--pLG))] xl:pr-[calc((100vw-1280px)/2)]"
      >
        <div className="sticky left-0 top-0 z-10 h-[5.5rem] w-full bg-transparent bg-gradient-to-b from-nightDew-200/80 via-nightDew-200/50 backdrop-blur-[1px] backdrop-saturate-[1.2]">
          <div className="absolute left-0 top-0 z-10 h-11 w-full bg-gradient-to-b from-nightDew-200/80 via-nightDew-200/70 to-transparent backdrop-blur-[2px]" />
        </div>
        <div>
          <ul className="blockContainer box-border flex h-full w-full flex-col items-start justify-start gap-[var(--gap)] xs:gap-[var(--gapXS)] md:gap-[var(--gapMD)] lg:gap-[var(--gapLG)]">
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
                        className="group flex h-full w-full"
                      >
                        {value.poster_path ? (
                          <img
                            src={config.imgUrlS02 + value.poster_path}
                            alt={value.title}
                            className="aspect-[18/27] h-full rounded-lg transition-all duration-300 group-hover/list:rounded-r-none"
                          />
                        ) : (
                          <div className="unavailable relative aspect-[18/27] h-full min-w-min items-center justify-between overflow-hidden rounded-lg object-cover transition-all duration-300 group-hover/list:rounded-r-none">
                            <p className="textBtn absolute left-[50%] top-1 w-min translate-x-[-50%] text-wrap text-xs text-opacity-30">
                              imagem indisponível
                            </p>
                          </div>
                        )}
                        <dl className="flex w-full flex-col items-start justify-center px-4">
                          <dt className="label line-clamp-1 py-0 leading-normal">
                            {value.title}
                          </dt>
                          {value.release_date && (
                            <dd className="data py-0 leading-normal">
                              {formatDate(value.release_date)}
                            </dd>
                          )}
                          {value.genre_ids && (
                            <dd className="data line-clamp-1 py-0 leading-normal">
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
