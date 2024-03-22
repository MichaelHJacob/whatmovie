import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl w-full h-auto mx-auto">{children}</div>;
}

export function BlockContainer({ children }: { children: ReactNode }) {
  return <div className="blockContainer ">{children}</div>;
}

export function CardInformation({ children }: { children: ReactNode }) {
  return (
    <dl
      className="bg-Surface rounded-lg px-4 pt-4 pb-2  flex flex-col  
   col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 snap-start"
    >
      {children}
    </dl>
  );
}

export function Break() {
  return (
    <hr className="border-2 border-solid border-Surface mx-[var(--p)] xs:mx-[var(--pXS)] lg:mx-[var(--pLG)] rounded-lg " />
  );
}