import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl w-full h-auto mx-auto">{children}</div>;
}

export function BlockContainer({ children }: { children: ReactNode }) {
  return <div className="blockContainer">{children}</div>;
}

export function CardInformation({ children }: { children: ReactNode }) {
  // 
  return (
    <dl className="max-lg:bg-Surface max-lg:rounded-lg max-lg:px-4 max-lg:pt-4 max-lg:pb-2  flex flex-col col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 snap-start">
      {children}
    </dl>
  );
}

export function Break() {
  return (
    <hr className="border-1 border-solid border-Surface shadow-sm mx-[var(--p)] xs:mx-[var(--pXS)] lg:mx-[var(--pLG)] rounded-lg " />
  );
}

export function LoadingCards({size = 20}: {size?: number}) {
  const skeleton = [];

  for (let i = 0; i < size ; i++) {
    skeleton.push(
      <div id={`loadC${i}`} className={`gridColSpanMovie ${size <= 5 && i >= 2 && 'max-xs:hidden' } 
      ${size <= 5 && i >= 4 && 'max-lg:hidden' } ${size <= 5 && i >= 4 && 'xl:hidden' }`} key={i} >
        <div className="w-full aspect-[18/27] bg-onSurface2/10 animate-pulse rounded-lg shadow-xl shadow-black/30"></div>
      </div>
    );
  }

  return skeleton;
}
