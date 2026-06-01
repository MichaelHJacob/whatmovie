import { Children, ReactNode } from "react";

import { tv } from "tailwind-variants";

type CardInformationProps = { children: ReactNode };

const cardInformationStyles = tv({
  base: "col-span-9 flex snap-start flex-col rounded-lg bg-base px-4 pb-2 pt-4 shadow-card-minimal xs:col-span-5 md:col-span-10 md:rounded-xl lg:col-span-6 xl:col-span-10",
});

export default function CardInformation({
  children,
}: Readonly<CardInformationProps>) {
  if (Children.toArray(children).length)
    return <div className={cardInformationStyles()}>{children}</div>;
}
