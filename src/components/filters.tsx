"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import AllMovieProviders from "./Provider";
import { MovieProviders } from "./utils/types";
import { BlockContainer } from "./comps";

export default function FilterContainer({
  totalPages,
  allMP,
}: {
  totalPages: number;
  allMP: MovieProviders;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const params = new URLSearchParams(searchParams);
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (elementRef.current) {
      setHeight(elementRef.current.clientHeight);
    }
  }, []);

  function BtnSortBy() {
    function handleSelect(selected: string) {
      params.set("sort", selected);
      params.set("page", "1");
      // console.log(selected);
      replace(`${pathname}?${params.toString()}`);
    }
    return (
      <label className="text-filter flex w-full justify-between items-center ">
        Ordenar por :
        <select
          className="btnStyle-filter bg-inherit  appearance-none "
          name="sortBy"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          defaultValue={searchParams.get("sort")?.toString()}
        >
          <option value="popularity">Popular</option>
          <option value="revenue">Custo</option>
          <option value="release_date">Lançamento</option>
          <option value="vote_average">Votos</option>
        </select>
      </label>
    );
  }

  function BtnPages() {
    if (totalPages > 500) {
      totalPages = 500;
    }
    const atual = Number(searchParams?.get("page")) || 1;

    function back() {
      if (atual == 1) {
        params.set("page", `${totalPages}`);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        params.set("page", `${atual - 1}`);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }

    function next() {
      if (atual == totalPages) {
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        params.set("page", `${atual + 1}`);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }

    return (
      <div className="    text-filter  flex w-full justify-between items-center   ">
        <label>
        <span className="md:hidden">Pag.</span>
        <span className="max-md:hidden">Página </span>
         {atual} 
        <span className="max-md:hidden">{totalPages < 500 && ` de ${totalPages}`}</span>
        </label>
        <div className="flex justify-between items-center   w-1/2 max-w-[6.5rem] ">
          <button className=" btnStyle-filter  " onClick={back}>
            {"<"}
          </button>

          <button className="btnStyle-filter " onClick={next}>
            {">"}
          </button>
        </div>
      </div>
    );
  }

  function RangeVote() {
    const [minRange, setMinRange] = useState(
      Number(searchParams?.get("vote_gte")) || 0
    );
    const [maxRange, setMaxRange] = useState(
      Number(searchParams?.get("vote_lte")) || 10
    );
    const [minNumber, setMinNumber] = useState(
      searchParams?.get("vote_gte") || "0"
    );
    const [maxNumber, setMaxNumber] = useState(
      searchParams?.get("vote_lte") || "10"
    );

    let leftSide = `${Math.floor((minRange / 10) * 100)}%`;
    let rightSide = `${Math.floor((1 - maxRange / 10) * 100)}%`;
    let timeIdMin = useRef<ReturnType<typeof setInterval> | null>(null);
    let timeIdMax = useRef<ReturnType<typeof setInterval> | null>(null);

    function toParams(min: string, max: string) {
      params.set("vote_gte", `${min}`);
      params.set("vote_lte", `${max}`);
      replace(`${pathname}?${params.toString()}`);
    }

    function disable() {
      params.delete("vote_gte");
      params.delete("vote_lte");

      replace(`${pathname}?${params.toString()}`);
    }

    function handleMinRange(valor: number) {
      if (valor < maxRange) {
        setMinNumber(String(valor));
        setMinRange(valor);
      }
    }

    function handleMaxRange(valor: number) {
      if (valor > minRange) {
        setMaxNumber(String(valor));
        setMaxRange(valor);
      }
    }

    function numberMin(e: ChangeEvent<HTMLInputElement>) {
      let valor = Number(e.target.value);
      if (timeIdMin.current) {
        clearTimeout(timeIdMin.current);
      }

      setMinNumber(e.target.value);
      if (valor >= 0 && valor <= 9) {
        e.target.onclick = () => {
          setMinRange(valor);
        };

        if (valor >= Number(maxNumber)) {
          e.target.onclick = () => {
            setMaxRange(valor + 1)
          };
          setMaxNumber(String(valor + 1));
          if (timeIdMin.current) {
            clearTimeout(timeIdMin.current);
          }
          timeIdMin.current = setTimeout(() => {
            toParams(valor.toString(), String(valor + 1));
          }, 500);
        } else {
          if (timeIdMin.current) {
            clearTimeout(timeIdMin.current);
          }
          timeIdMin.current = setTimeout(() => {
            toParams(valor.toString(), maxNumber);
          }, 500);
        }
      } else {
        if (timeIdMin.current) {
          clearTimeout(timeIdMin.current);
        }
        timeIdMin.current = setTimeout(() => {
          setMinNumber(String(minRange));
          e.target.classList.add("animate-wrong");
        }, 2000);
        e.target.classList.remove("animate-wrong");
      }
    }

    function numberMax(e: ChangeEvent<HTMLInputElement>) {
      let valor = Number(e.target.value);
      if (timeIdMax.current) {
        clearTimeout(timeIdMax.current);
      }
      setMaxNumber(e.target.value);
      if (valor >= 1 && valor <= 10) {
        e.target.onclick = () => {
          setMaxRange(valor);
        };

        if (valor <= Number(minNumber)) {
          e.target.onclick = () => {
            setMinRange(valor - 1);
          }
          setMinNumber(String(valor - 1));

          if (timeIdMax.current) {
            clearTimeout(timeIdMax.current);
          }
          timeIdMax.current = setTimeout(() => {
            toParams(String(valor - 1), valor.toString());
          }, 500);
        } else {
          if (timeIdMax.current) {
            clearTimeout(timeIdMax.current);
          }
          timeIdMax.current = setTimeout(() => {
            toParams(minNumber, valor.toString());
          }, 500);
        }
      } else {
        if (timeIdMax.current) {
          clearTimeout(timeIdMax.current);
        }
        timeIdMax.current = setTimeout(() => {
          setMaxNumber(String(maxRange));
          e.target.classList.add("animate-wrong");
        }, 2000);
        e.target.classList.remove("animate-wrong");
      }
    }

    return (
      <div className="w-full h-full text-filter   relative">
        <div className="w-full flex    pb-3 ">
          <div className="flex w-full h-[45px] items-center">
            <span className="px-6">Min</span>
            <input
              type="number"
              value={minNumber}
              className=" outline-none text-xl ml-3 rounded btnStyle-filter text-center "
              onChange={(e) => numberMin(e)}
              onTouchStartCapture={() => {
                setMinNumber("");
              }}
              pattern="[0-9]*"
              inputMode="decimal"
              name="minNumber"
              min={0}
              max={10}
            />
          </div>
          <div className=" flex text-sm items-center px-6 justify-center">
            |
          </div>
          <div className="flex w-full h-[45px] items-center ">
            <span className="px-6 ">Max</span>
            <input
              type="number"
              className=" outline-none text-xl btnStyle-filter rounded  text-center "
              value={maxNumber}
              onChange={(e) => numberMax(e)}
              onTouchStartCapture={() => {
                setMaxNumber("");
              }}
              pattern="[0-9]*"
              inputMode="decimal"
              min={0}
              max={10}
            />
          </div>
        </div>
        {/* dark:bg-neutral-800  */}
        <div className="h-2  shadow-lg bg-slate-100/40  relative  rounded-lg 0 mx-2 ">
          {/* dark:bg-neutral-300/50 */}
          <div
            className="h-full absolute rounded-lg bg-gray-400  "
            style={{
              right: rightSide,
              left: leftSide,
            }}
          ></div>
        </div>
        <div className="relative 192.168.1.104">
          <input
            type="range"
            className="absolute w-full h-2 top-[-8px]  bg-transparent pointer-events-none appearance-none  "
            min={0}
            max={10}
            step={0.1}
            value={minRange}
            onChange={(e) => handleMinRange(Number(e.target.value))}
            onMouseUp={(e) => toParams(String(minRange), maxNumber)}
            onTouchEnd={(e) => toParams(String(minRange), maxNumber)}
          />
          <input
            type="range"
            className="absolute w-full h-2 top-[-8px]  bg-transparent pointer-events-none appearance-none"
            min={0}
            max={10}
            step={0.1}
            value={maxRange}
            onChange={(e) => handleMaxRange(Number(e.target.value))}
            onMouseUp={(e) => toParams(minNumber, String(maxRange))}
            onTouchEnd={(e) => toParams(minNumber, String(maxRange))}
          />
        </div>
      </div>
    );
  }

  function FilterByProviders() {
    const [state, setState] = useState("350");
    return (
      <div>
        <label>
          Provedor:{" "}
          <input
            type="number"
            name="provider"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className=" outline-none text-xl rounded btnStyle-filter text-center "
          />
        </label>
      </div>
    );
  }

  //  top-[calc(${"-"+height+'px'}_+_2.75rem_+_3rem_+_1rem)] paddingHeader 

  return (
    <div className="  sticky top-[-3.75rem] xs:top-[-4.5rem] lg:top-[-4.75rem] ">
      <BlockContainer> 
        <div className="   h-auto  auto-rows-[3rem]  gridTemplateSpace ">
          <div className="rounded-md flex items-center justify-center    bg-blur-cardBtn  col-span-full lg:col-[span_16_/_span_16] row-span-2   ">
            <RangeVote />
          </div>
          {/* <div className="rounded-md flex items-center justify-center text-xl text-white  row-span-2 sm:col-span-1 col-span-2 ">
            <FilterByProviders />
          </div> */}
          {/* <div className="rounded-md flex items-center justify-center text-xl text-white  bg-blur-cardBtn row-span-1 col-span-3 "> 
      <div className="w-full overflow-x-scroll h-full flex ">
      {allMP?.results.map((value) => (
        <>
        <p>{value.provider_id }</p> - 
        </>
      ))}
    </div>
      </div> */}

          <div className="rounded-md flex items-center justify-center bg-blur-cardBtn col-span-6 xs:col-span-10 md:col-span-7 lg:col-span-8">
            <BtnSortBy />
          </div>
          <div className="rounded-md flex items-center justify-center bg-blur-cardBtn col-span-4 xs:col-span-5 md:col-span-5 lg:col-span-8 ">
            <BtnPages />
          </div>
        </div>

      </BlockContainer>
   </div>
  );
}
