"use client";
// import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BlockContainer, Container, SubTitle } from "./comps";
import {
  ListGenres,
  MovieProviders,
  TypeBtnGenres,
  TypeBtnProvider,
} from "./utils/types";
import Image from "next/image";

export function BtnPages({ totalPages }: { totalPages: number }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  if (totalPages > 500) {
    totalPages = 500;
  }
  const atual = Number(searchParams?.get("page")) || 1;

  function back() {
    if (atual == 1) {
      params.set("page", `${totalPages}`);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("page", `${atual - 1}`);
      replace(`${pathname}?${params.toString()}`);
    }
  }

  function next() {
    if (atual == totalPages) {
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`, { scroll: true });
    } else {
      params.set("page", `${atual + 1}`);
      replace(`${pathname}?${params.toString()}`, { scroll: true });
    }
  }

  if (totalPages == 1)
    return (
      <SubTitle>
        Considere um filtro mais amplo para exibir mais resultados
      </SubTitle>
    );
  if (totalPages == 0) return;

  return (
    <div className=" w-full flex justify-end">
      <div
        className=" inline-flex items-center gap-[var(--gap)] 
    xs:gap-[var(--gapXS)] 
    lg:gap-[var(--gapLG)]"
      >
        <div
          className="text-onBackground1 
    text-lg font-medium antialiased"
        >
          <span className="md:hidden">Pag.</span>
          <span className="max-md:hidden">Página </span>
          {atual}
          <span className="max-md:hidden">
            {totalPages < 500 && ` de ${totalPages}`}
          </span>
        </div>
        <button
          onClick={back}
          className="mr-[calc(var(--gap)_*_-1)] xs:mr-[calc(var(--gapXS)_*_-1)] md:mr-[calc(var(--gapMD)_*_-1)] lg:mr-[calc(var(--gapLG)_*_-1)]  main-backBTn rounded-r-none"
        >
          {" "}
          {"<"}
        </button>

        <button onClick={next} className="main-backBTn rounded-l-none">
          {">"}
        </button>
      </div>
    </div>
  );
}

function ClearSelected({ onClear }: { onClear: () => void }) {
  return (
    <button className="filter-BackBtn  " type="button" onClick={onClear}>
      <span className="filter-TextBtn">Limpar</span>
    </button>
  );
}

function ProviderButton({
  provider,
  add,
  remove,
}: {
  provider: TypeBtnProvider;
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
}) {
  return (
    <label className="box-content h-11 relative cursor-pointer ">
      {/* <span>{provider.provider_name}</span> */}
      <input
        className="  bg-transparent  appearance-none absolute opacity-100 peer"
        type="checkbox"
        value={provider.provider_id}
        checked={provider.state}
        onChange={() => (provider.state ? remove(provider) : add(provider))}
      />
      <Image
        className="rounded-lg opacity-40 grayscale-[95%] peer-checked:grayscale-0 peer-checked:opacity-100 transition-all duration-700 "
        src={`https://image.tmdb.org/t/p/w342/${provider.logo_path}`}
        width={44}
        height={44}
        alt={provider.provider_name}
      />
    </label>
  );
}

function SelectProviders({
  providers,
  add,
  remove,
  clear,
}: {
  providers: TypeBtnProvider[];
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
  clear: (filter?: string) => void;
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="filter-label ">Onde assistir:</span>
        <ClearSelected onClear={() => clear("p")} />
      </div>
    
      <ul className="h-auto w-full bg-neutral-500/5 rounded-lg py-2 flex flex-wrap justify-center gap-2 select-none   ">
        {providers.map((value) => (
          <li key={value.provider_id}>
            <ProviderButton provider={value} add={add} remove={remove} />
          </li>
        ))}
      </ul>

    </>
  );
}

export default function FilterSideMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  let timeId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const divFilters = useRef<HTMLDivElement>(null);

  const [handle, setHandle] = useState(false);
  const [dataGenres, setGenres] = useState<ListGenres | null>(null);
  const [isLoadingG, setLoadingG] = useState(true);
  const [resetGenres, setRGenres] = useState<ListGenres | null>(null);

  const [dataProviders, setProviders] = useState<TypeBtnProvider[] | null>(
    null
  );
  const [usualP, setUsualP] = useState<TypeBtnProvider[]>([]);
  const [resetProviders, setRProviders] = useState<
    | {
        logo_path: string;
        provider_name: string;
        provider_id: number;
        state: false;
      }[]
    | null
  >(null);

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
        setLoadingG(false);
        setRGenres(data);
      });

    fetch("api/providers")
      .then((res) => res.json())
      .then((data: MovieProviders) => {
        const active = data.results.filter((value) =>
          params.has("p", String(value.provider_id))
        );

        const disable = data.results.filter(
          (value) => params.has("p", String(value.provider_id)) == false
        );
        setUsualP(
          active.map((value) => {
            return {
              logo_path: value.logo_path,
              provider_name: value.provider_name,
              provider_id: value.provider_id,
              state: true,
            };
          })
        );

        setProviders([
          ...active.map((value) => {
            return {
              logo_path: value.logo_path,
              provider_name: value.provider_name,
              provider_id: value.provider_id,
              state: true,
            };
          }),
          ...disable.map((value) => {
            return {
              logo_path: value.logo_path,
              provider_name: value.provider_name,
              provider_id: value.provider_id,
              state: false,
            };
          }),
        ]);

        setRProviders(
          data.results.map((value) => {
            return {
              logo_path: value.logo_path,
              provider_name: value.provider_name,
              provider_id: value.provider_id,
              state: false,
            };
          })
        );
      });

    const element = document.getElementById("Movies");
    if (element) element.scrollIntoView();
  }, []);

  function SelectGenre({clear}: { clear: (filter?: string) => void;}) {
    if (isLoadingG) return <p> Carregando ... </p>;
    if (!dataGenres) return <p>Sem dados de perfil</p>;

    let list = dataGenres.genres;

    function ToggleBtn({
      data,
      i,
    }: {
      data: {
        id: number;
        name: string;
      };
      i: number;
    }) {
      const [isChecked, setIsChecked] = useState<boolean>(
        params.has("g", `${data.id}`)
      );

      function handleChecks(e: ChangeEvent<HTMLInputElement>): void {
        let get: {
          id: number;
          name: string;
        };
        if (isChecked) {
          get = list[i];
          list.splice(i, 1);
          list.push(get);
          params.delete("g", e.target.value);
        } else {
          get = list[i];
          list.splice(i, 1);
          list.unshift(get);
          params.append("g", e.target.value);
        }
        params.set("page", "1");
        setIsChecked(!isChecked);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }

      return (
        <label
          key={data.id}
          className={`filter-BackBtn transition-all duration-300 ${
            isChecked ? "bg-sky-800/10" : "bg-neutral-500/5 "
          } `}
        >
          <span
            className={`filter-TextBtn ${
              isChecked ? "order-1" : "order-2 text-neutral-500/75"
            } `}
          >
            {data.name}
          </span>
          <input
            type="checkbox"
            value={data.id}
            checked={isChecked}
            // defaultChecked={params.has("g", `${data.id}`)}
            onChange={(e) => handleChecks(e)}
            name={`option${data.id}`}
            className={`w-3 h-3  border-transparent ${
              isChecked ? "order-2" : "order-1"
            } `}
          />
        </label>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center">
          <span className="filter-label ">Gênero:</span>
          <ClearSelected onClear={() => clear("g")} />
        </div>

        <ul className="h-auto  flex flex-wrap justify-start gap-2 select-none transition duration-150 ease-out hover:ease-in ">
          {list.map((value, index) => (
            <li key={value.id}>
              <ToggleBtn data={value} i={index} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  function BtnScroll() {
    function open() {
      const element = document.getElementById(
        handle == true ? "Movies" : "filtersID"
      );
      setHandle(!handle);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    return (
      <button
        onClick={open}
        className="
      main-backBTn   xl:hidden  "
      >
        <span className="filter-TextBtn">
          {handle ? " < Fechar " : "Expandir filtro  >"}
        </span>
      </button>
    );
  }

  function handleOpen() {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    timeId.current = setTimeout(() => {
      if (divFilters.current) {
        if (divFilters.current.getBoundingClientRect().left == 0) {
          setHandle(true);
        } else setHandle(false);
      }
    }, 1);
  }

  function Break() {
    return (
      <hr className="border-2 border-solid border-btnFilter rounded-lg " />
    );
  }

  function RangeVote() {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);

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

    // function disable() {
    //   params.delete("vote_gte");
    //   params.delete("vote_lte");

    //   replace(`${pathname}?${params.toString()}`);
    // }

    function handleMinRange(valor: number) {
      if (valor < maxRange - 0.9) {
        setMinNumber(String(valor));
        setMinRange(valor);
      }
    }

    function handleMaxRange(valor: number) {
      if (valor > minRange + 0.9) {
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
            setMaxRange(valor + 1);
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
          };

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
      <>
        <span className="filter-label ">Pontuação:</span>
        {/* <div className="w-full h-full text-filter   relative"> */}
        <div className="w-full flex justify-between ">
          <label className="filter-BackBtn">
            <span className="filter-labelBtn">Min</span>
            <input
              type="number"
              value={minNumber}
              className="text-center filter-TextBtn    rounded-lg  bg-transparent w-[44px] h-11 mx-[-10px] "
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
          </label>

          <label className="filter-BackBtn ">
            <span className="filter-labelBtn">Max</span>
            <input
              type="number"
              className=" text-center filter-TextBtn    rounded-lg  bg-transparent w-[44px] h-11 mx-[-10px]"
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
          </label>
        </div>
        {/* dark:bg-neutral-800  */}
        <div className=" w-full h-11  pt-[20px] ">
          <div className="h-1  bg-btnFilter relative  rounded-lg    ">
            {/* dark:bg-neutral-300/50 */}
            <div
              className="h-full absolute rounded-lg bg-sky-800  "
              style={{
                right: rightSide,
                left: leftSide,
              }}
            ></div>
          </div>

          <div className="relative">
            <input
              type="range"
              className="absolute w-full h-0 top-[-2px] pointer-events-none appearance-none  "
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
              className="absolute w-full h-0 top-[-2px] pointer-events-none appearance-none"
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
      </>
    );
  }

  function BtnSortBy() {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);

    function handleSelect(selected: string) {
      params.set("sort", selected);
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
    return (
      <label
        className="rounded-lg 
      flex    justify-between items-center transition-all duration-300    
      h-min  w-full "
      >
        <span className="filter-label">Ordenar por:</span>
        <select
          className="filter-BackBtn filter-TextBtn"
          name="sortBy"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          defaultValue={searchParams.get("sort")?.toString()}
        >
          <option value="popularity">Popularidade</option>
          <option value="revenue">Custo</option>
          <option value="release_date">Lançamento</option>
          <option value="vote_average">Votos</option>
        </select>
      </label>
    );
  }

  function reset(filter?: string) {
    switch (filter) {
      case "p":
        setProviders(JSON.parse(JSON.stringify(resetProviders)));
        setUsualP([]);
        break;
      case "g":
        setGenres(JSON.parse(JSON.stringify(resetGenres)));
        break;
      default:
        setProviders(JSON.parse(JSON.stringify(resetProviders)));
        setUsualP([]);
        setGenres(JSON.parse(JSON.stringify(resetGenres)));
        replace(`${pathname}`);
        return;
    }
    params.delete(filter);
    replace(`${pathname}?${params.toString()}`);
  }

  function BtnReset() {
    if (dataProviders && dataGenres && resetProviders) {
      return (
        <button
          className="main-backBTn"
          onClick={() => {
            reset();
          }}
        >
          <span className="filter-TextBtn">Reset</span>
        </button>
      );
    } else {
      return (
        <span className="main-backBTn filter-TextBtn transition animate-pulse">
          aguarde
        </span>
      );
    }
  }

  function addProvider(picked: TypeBtnProvider) {
    if (dataProviders == null) return;
    const copy = { ...picked };
    copy.state = true;

    setProviders([
      { ...copy },
      ...dataProviders?.filter(
        (value) => value.provider_id !== picked.provider_id
      ),
    ]);

    if (usualP.length > 0) {
      setUsualP([
        { ...copy },
        ...usualP.filter((value) => value.provider_id !== copy.provider_id),
      ]);
    } else {
      setUsualP([{ ...copy }]);
    }

    params.append("p", String(picked.provider_id));
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function removeProvider(picked: TypeBtnProvider) {
    if (dataProviders == null) return;

    const copy = { ...picked };
    copy.state = false;

    setProviders([
      ...dataProviders?.filter(
        (value) => value.provider_id !== picked.provider_id
      ),
      { ...copy },
    ]);
    if (usualP.length > 0) {
      setUsualP([
        ...usualP.filter((value) => value.provider_id !== copy.provider_id),
        { ...copy },
      ]);
    } else {
      setUsualP([{ ...copy }]);
    }

    params.delete("p", String(picked.provider_id));
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      onScroll={handleOpen}
      className="overflow-x-auto  w-auto h-dvh  snap-x  z-10  snap-mandatory whitespace-nowrap  overscroll-x-contain xl:mx-auto xl:w-auto   no-scrollbar scrollStyle "
    >
      <div
        ref={divFilters}
        id="filtersID"
        className="  h-full min-w-80 w-[80vw] max-w-sm lg:max-w-lg xl:max-w-md  inline-block overscroll-x-contain overflow-y-scroll      snap-end snap-always overscroll-y-contain    pt-[5.5rem] bg-Surface "
      >
        <BlockContainer>
          <div
            className="flex flex-col 
            gap-[var(--gap)] 
            xs:gap-[var(--gapXS)] 
            md:gap-[var(--gapMD)] 
            lg:gap-[var(--gapLG)]
            "
          >
            <BtnSortBy />
            <Break />
            <RangeVote />
            <Break />
            <SelectGenre clear={reset} />
            <Break />
            {dataProviders && (
              <SelectProviders
                providers={dataProviders}
                add={addProvider}
                remove={removeProvider}
                clear={reset}
              />
            )}
          </div>
        </BlockContainer>
      </div>

      <div
        id="Movies"
        className="snap-start snap-always h-full w-screen  xl:w-[calc(100%-448px)] inline-block overscroll-y-contain  overflow-auto "
      >
        <Container>
          <div className="bg-gradient-to-b from-Background  via-Background/80 to-transparent  fixed top-0  left-0 h-11 backdrop-blur-[2px] w-full   z-10 " />
          <div className="bg-gradient-to-b from-Background  via-Background/50 bg-transparent  fixed top-0  left-0 h-[5.5rem] backdrop-blur-[1px] w-full   backdrop-saturate-[1.2]   z-10 " />
          <div className="paddingHeader" />
          <div className="h-min sticky z-[100] top-14   w-full  snap-always snap-start   ">
            <BlockContainer>
              <div className=" w-full  flex gap-2  h-auto overflow-x-scroll transition-all duration-1000">
                <BtnScroll />
                <BtnReset />
                {usualP.length > 0 && (
                  <ul className="h-11 w-auto  flex  justify-start gap-2 select-none   ">
                    {usualP.map((value) => (
                      <li key={value.provider_id} className="h-11  w-11">
                        <ProviderButton
                          provider={value}
                          add={addProvider}
                          remove={removeProvider}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </BlockContainer>
          </div>

          {children}
        </Container>
      </div>
    </div>
  );
}
