import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl w-full h-auto mx-auto">{children}</div>;
}

export function CardInformation({ children }: { children: ReactNode }) {
  return (
    <dl className="max-lg:bg-nightDew-100 max-lg:rounded-lg max-lg:px-4 max-lg:pt-4 max-lg:pb-2  flex flex-col col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 xl:col-span-3 snap-start max-lg:light-shadow">
      {children}
    </dl>
  );
}

export function Break({color = 'border-nightDew-600/10' }:{color?: String}) {
  return (
    <hr className={`border-[1px] border-solid ${color} mx-[--p] xs:mx-[--pXS] lg:mx-[--pLG] rounded-lg`}/>
  );
}

export function LoadingCards({size = 20}: {size?: number}) {
  const skeleton = [];

  for (let i = 0; i < size ; i++) {
    skeleton.push(
      <div  key={i} id={`loadC${i}`} className={`gridColSpanMovie ${size <= 5 && i >= 2 && 'max-xs:hidden' } 
      ${size <= 5 && i >= 4 && 'max-lg:hidden' } ${size <= 5 && i >= 4 && 'xl:hidden' }`} >
        <div className="w-full aspect-[18/27] unavailable  animate-pulse rounded-lg mid-shadow"/>
      </div>
    );
  }

  return skeleton;
}
