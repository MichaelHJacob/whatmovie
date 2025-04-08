import { ReactNode } from "react";

type CardInformationProps = {  children: ReactNode  };

export default function CardInformation({ children  }: CardInformationProps) {
  return (
    <dl className="max-lg:bg-nightDew-100 max-lg:rounded-lg max-lg:px-4 max-lg:pt-4 max-lg:pb-2  flex flex-col col-span-9 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 xl:col-span-3 snap-start light-shadow lg:shadow-none">
      {children}
    </dl>
  );
}