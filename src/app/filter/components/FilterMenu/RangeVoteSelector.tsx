import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function RangeVoteSelector() {
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

  const leftSide = `${Math.floor((minRange / 10) * 100)}%`;
  const rightSide = `${Math.floor((1 - maxRange / 10) * 100)}%`;
  const timeIdMin = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeIdMax = useRef<ReturnType<typeof setInterval> | null>(null);

  function toParams(min: string, max: string) {
    params.set("vote_gte", `${min}`);
    params.set("vote_lte", `${max}`);
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
      <fieldset className="flex flex-col gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG] max-h-fit ">
        <legend
          className="blockContainer-x 
      pb-[--gap] xs:pb-[--gapXS] md:pb-[--gapMD] lg:pb-[--gapLG]"
        >
          <span className="filter-label">Pontuação:</span>
        </legend>
        <div className="w-full flex justify-between blockContainer-x ">
          <label className="backBtn flex items-center">
            <span className="textBtn uppercase text-xs opacity-65">Min</span>
            <input
              type="number"
              value={minNumber}
              className="text-center textBtn    rounded-lg  bg-transparent w-[44px] h-11 mx-[-10px] "
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

          <label className="backBtn flex items-center">
            <span className="textBtn uppercase text-xs opacity-65">Max</span>
            <input
              type="number"
              className=" text-center textBtn    rounded-lg  bg-transparent w-[44px] h-11 mx-[-10px]"
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

        <div className=" w-full h-11  pt-[20px] blockContainer-x ">
          <div className="h-1 bg-nightDew-300 relative rounded-lg">
            <div
              className="h-full absolute rounded-lg bg-selector-100  "
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
              onMouseUp={() => toParams(String(minRange), maxNumber)}
              onTouchEnd={() => toParams(String(minRange), maxNumber)}
            />
            <input
              type="range"
              className="absolute w-full h-0 top-[-2px] pointer-events-none appearance-none"
              min={0}
              max={10}
              step={0.1}
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