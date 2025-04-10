import { ReactNode } from "react";

type CardInformationProps = { children: ReactNode };

export default function CardInformation({ children }: CardInformationProps) {
  return (
    <dl className="light-shadow col-span-9 flex snap-start flex-col max-lg:rounded-lg max-lg:bg-nightDew-100 max-lg:px-4 max-lg:pb-2 max-lg:pt-4 xs:col-span-7 sm:col-span-6 md:col-span-4 lg:col-span-5 lg:shadow-none xl:col-span-3">
      {children}
    </dl>
  );
}
