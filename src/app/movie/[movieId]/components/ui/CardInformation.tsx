import { Children, ReactNode } from "react";

type CardInformationProps = { children: ReactNode };

export default function CardInformation({
  children,
}: Readonly<CardInformationProps>) {
  if (Children.toArray(children).length)
    return (
      <div className="col-span-9 flex snap-start flex-col rounded-lg bg-base px-4 pb-2 pt-4 shadow-card-minimal xs:col-span-7 sm:col-span-6 md:col-span-4 md:rounded-xl lg:col-span-5 xl:col-span-3">
        {children}
      </div>
    );
}
