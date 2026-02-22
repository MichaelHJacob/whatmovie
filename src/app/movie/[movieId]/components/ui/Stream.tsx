import HTitle from "@/components/ui/HTitle";
import { LOGO } from "@/config/imageConfig";
import { ResultsProvidersType } from "@/lib/validation/watchProvidersSchema";

type StreamProps = { provider: ResultsProvidersType };

export default function Stream({ provider }: Readonly<StreamProps>) {
  if (!provider.flatrate) return;

  return (
    <>
      <HTitle
        container={false}
        className="mb-2 px-1 font-bold text-base-strong"
      >
        Disponível em:
      </HTitle>
      <ul className="flex w-full justify-start gap-2 px-1 xs:grid xs:grid-cols-[repeat(auto-fit,minmax(min(45%,13rem),1fr))]">
        {provider.flatrate.map((value, i: number, arr) => (
          <li
            key={i}
            className="col-span-1 row-span-1 inline-flex h-11 w-fit items-center gap-1"
          >
            <img
              className="h-10 w-10 select-none rounded-xl contrast-[1.1]"
              srcSet={`${LOGO.w92}${value.logo_path} 1x, ${LOGO.w154}${value.logo_path} 2x`}
              src={LOGO.w154 + value.logo_path}
              alt={`logo ${value.provider_name}`}
            />
            <p
              className={`data font-semibold text-base-medium ${
                arr.length > 2 && "max-xs:hidden"
              }`}
            >
              {value.provider_name}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
