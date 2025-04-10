import { ReactNode } from "react";

type LabelH4Props = { children: ReactNode };

export default function LabelH4({ children }: LabelH4Props) {
  return (
    <div className="flex min-h-11 w-fit items-center">
      <h4 className="subTitle text-base leading-normal">{children}</h4>
    </div>
  );
}
