import { ReactNode } from "react";

export function Container({
  children,
  paddingTop,
}: {
  children: ReactNode;
  paddingTop?: boolean;
}) {
  return (
    <div
      className={`max-w-7xl w-full h-auto mx-auto ${
        paddingTop && "paddingHeader"
      }`}
    >
      {children}
    </div>
  );
}

export function CardInformation({ children }: { children: ReactNode }) {
  return (
    <dl className="max-lg:bg-nightDew-100 max-lg:rounded-lg max-lg:px-4 max-lg:pt-4 max-lg:pb-2  flex flex-col col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 xl:col-span-3 snap-start light-shadow lg:shadow-none">
      {children}
    </dl>
  );
}

export function Break({
  color = "border-nightDew-600/10",
}: {
  color?: String;
}) {
  return (
    <hr
      className={`border-[1px] border-solid ${color} mx-[--p] xs:mx-[--pXS] lg:mx-[--pLG] rounded-lg`}
    />
  );
}

export function MovieCards({
  id,
  size = 6,
  base = 2,
  xs = 3,
  md = 4,
  lg = 5,
  xl = 6,
  style,
}: {
  id: string;
  size?: number;
  base?: number;
  xs?: number;
  md?: number;
  lg?: number;
  xl?: number;
  style?: string;
}) {
  const skeleton = [];

  for (let i = 0; i < size; i++) {
    skeleton.push(
      <li
        key={i}
        id={id + i}
        className={`gridColSpanMovie ${style} 
        ${size <= 6 && i >= base && "max-xs:hidden"} 
        ${size <= 6 && i >= xs && "xs:max-md:hidden"} 
        ${size <= 6 && i >= md && "md:max-lg:hidden"} 
        ${size <= 6 && i >= lg && "lg:max-xl:hidden"} 
        ${size <= 6 && i >= xl && "xl:max-2xl:hidden"}`}
      >
        <div className="w-full aspect-[2/3] unavailable  animate-pulse rounded-lg mid-shadow" />
      </li>
    );
  }

  return skeleton;
}

export function SkeletonListMovie() {
  return (
    <section className="bg-nightDew-100 relative before:bg-nightDew-100  before:w-screen before:h-full before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:z-[-1]">
      <div className="py-2 xs:py-[1rem] lg:py-6 blockContainer-x">
        <div className="h-6 w-24 rounded-lg mb-2 bg-nightDew-600/20" />
      </div>

      <ul className="ListSpacing items-end">
        <MovieCards id="Recommendations" />
      </ul>
    </section>
  );
}
