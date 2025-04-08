import { ReactNode } from "react";

type LabelH4Props = {  children: ReactNode  };

export default function LabelH4({ children  }: LabelH4Props) {
  return (
    <div className=" flex items-center min-h-11 w-fit">
      <h4 className="subTitle leading-normal text-base">{children}</h4>
    </div>
  );
}