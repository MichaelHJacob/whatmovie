import config from "@/components/utils/config";
import { Provider } from "@/components/utils/types";

type StreamProps = { provider?: Provider };

export default function Stream({ provider } : StreamProps ){
  if(provider !== undefined && provider.flatrate !== undefined && provider.flatrate.length >= 1 ){
  return (
    <>
      <dt className="label mb-2 text-nightDew-200 font-bold">Disponível em:</dt>

      <dd className="flex flex-row flex-wrap w-full gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]  ">
        {provider.flatrate.map((value, i: number, arr) => (
          <div
            key={i}
            className="mb-1 inline-flex h-11 w-fit  items-center gap-[calc(var(--gap)/2)] xs:gap-[calc(var(--gapXS)/2)] md:gap-[calc(var(--gapMD)/2)] lg:gap-[calc(var(--gapLG)/2)] 
        "
          >
            <img
              className="rounded-xl h-10 w-10 select-none contrast-[1.1]"
              srcSet={`${config.imgUrlS01}${value.logo_path}, ${config.imgUrlS03}${value.logo_path} 2x`}
              src={`${config.imgUrlS01}${value.logo_path}`}
              alt={`logo ${value.provider_name}`}
            />
            <div
              className={`data font-semibold text-nightDew-200 ${
                arr.length > 2 && "max-sm:hidden"
              }`}
            >
              {value.provider_name}{" "}
              <span
                className={`data text-nightDew-200 select-none ${
                  i + 1 == arr.length && "hidden"
                }`}
              >
                |
              </span>
            </div>
          </div>
        ))}
      </dd>
    </>
  )};
}