import { ChangeEvent, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FiltersMap } from "@/types/filtersTypes";

type RangeVoteSelectorProps = { props: FiltersMap["voteAverage"] };

export default function RangeVoteSelector({ props }: RangeVoteSelectorProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [minRange, setMinRange] = useState(
    Number(searchParams?.get(props.keys[1])) || props.allowedValues.gte,
  );
  const [maxRange, setMaxRange] = useState(
    Number(searchParams?.get(props.keys[2])) || props.allowedValues.lte,
  );
  const [minNumber, setMinNumber] = useState(
    searchParams?.get(props.keys[1]) || props.allowedValues.gte.toString(),
  );
  const [maxNumber, setMaxNumber] = useState(
    searchParams?.get(props.keys[2]) || props.allowedValues.lte.toString(),
  );

  const leftSide = `${Math.floor((minRange / props.allowedValues.lte) * 100)}%`;
  const rightSide = `${Math.floor((1 - maxRange / props.allowedValues.lte) * 100)}%`;
  const timeIdMin = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeIdMax = useRef<ReturnType<typeof setInterval> | null>(null);

  function toParams(min: string, max: string) {
    params.set(props.keys[1], `${min}`);
    params.set(props.keys[2], `${max}`);
    replace(`${pathname}?${params.toString()}`);
  }

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
    const valor = Number(e.target.value);
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
    const valor = Number(e.target.value);
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
    <li>
      <fieldset className="flex max-h-fit flex-col gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]">
        <legend className="blockContainer-x pb-[--gap] xs:pb-[--gapXS] md:pb-[--gapMD] lg:pb-[--gapLG]">
          <span className="filter-label">Pontuação:</span>
        </legend>
        <div className="blockContainer-x flex w-full justify-between">
          <label className="backBtn flex items-center">
            <span className="textBtn text-xs uppercase opacity-65">Min</span>
            <input
              type="number"
              value={minNumber}
              className="textBtn mx-[-10px] h-11 w-[44px] rounded-lg bg-transparent text-center"
              onChange={(e) => numberMin(e)}
              onTouchStartCapture={() => {
                setMinNumber("");
              }}
              pattern="[0-9]*"
              inputMode="decimal"
              name="minNumber"
              min={props.allowedValues.gte}
              max={props.allowedValues.lte}
            />
          </label>

          <label className="backBtn flex items-center">
            <span className="textBtn text-xs uppercase opacity-65">Max</span>
            <input
              type="number"
              className="textBtn mx-[-10px] h-11 w-[44px] rounded-lg bg-transparent text-center"
              value={maxNumber}
              onChange={(e) => numberMax(e)}
              onTouchStartCapture={() => {
                setMaxNumber("");
              }}
              pattern="[0-9]*"
              inputMode="decimal"
              min={props.allowedValues.gte}
              max={props.allowedValues.lte}
            />
          </label>
        </div>

        <div className="blockContainer-x h-11 w-full pt-[20px]">
          <div className="relative h-1 rounded-lg bg-nightDew-300">
            <div
              className="absolute h-full rounded-lg bg-selector-100"
              style={{
                right: rightSide,
                left: leftSide,
              }}
            ></div>
          </div>

          <div className="relative">
            <input
              type="range"
              className="pointer-events-none absolute top-[-2px] h-0 w-full appearance-none"
              step={1.0}
              min={props.allowedValues.gte}
              max={props.allowedValues.lte}
              value={minRange}
              onChange={(e) => handleMinRange(Number(e.target.value))}
              onMouseUp={() => toParams(String(minRange), maxNumber)}
              onTouchEnd={() => toParams(String(minRange), maxNumber)}
            />
            <input
              type="range"
              className="pointer-events-none absolute top-[-2px] h-0 w-full appearance-none"
              step={1.0}
              min={props.allowedValues.gte}
              max={props.allowedValues.lte}
              value={maxRange}
              onChange={(e) => handleMaxRange(Number(e.target.value))}
              onMouseUp={() => toParams(minNumber, String(maxRange))}
              onTouchEnd={() => toParams(minNumber, String(maxRange))}
            />
          </div>
        </div>
      </fieldset>
    </li>
  );
}
