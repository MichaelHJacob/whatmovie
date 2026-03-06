import HTitle from "@/components/ui/HTitle";
import { LOGO } from "@/config/imageConfig";
import { ResultsProvidersType } from "@/lib/validation/watchProvidersSchema";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const streamStyles = tv({
  slots: {
    section: "border-t border-solid border-t-base-accent",
    ul: "max-md:all-gap flex w-full justify-start xs:grid xs:grid-cols-[repeat(auto-fit,minmax(min(45%,13rem),1fr))] md:gap-2 lg:gap-3",
    li: "col-span-1 row-span-1 inline-flex h-11 w-fit items-center gap-1",
    img: "h-10 w-10 select-none rounded-xl contrast-[1.1]",
  },
});

type StreamProps = {
  provider: ResultsProvidersType;
  title: string;
  text: string;
};

export default function Stream({
  provider,
  title,
  text,
}: Readonly<StreamProps>) {
  if (!provider.flatrate) return;
  const { section, ul, li, img } = streamStyles();

  return (
    <section className={section()}>
      <HTitle container={false} className={title}>
        Disponível em:
      </HTitle>
      <ul className={ul()}>
        {provider.flatrate.map((value, i: number, arr) => (
          <li key={value.provider_id + "_" + i} className={li()}>
            <img
              className={img()}
              srcSet={`${LOGO.w92}${value.logo_path} 1x, ${LOGO.w154}${value.logo_path} 2x`}
              src={LOGO.w154 + value.logo_path}
              alt={`logo ${value.provider_name}`}
            />
            <p className={clsx(text, arr.length > 2 && "max-xs:hidden")}>
              {value.provider_name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
