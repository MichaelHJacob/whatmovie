import { ReactNode } from "react";

type SubTitleProps = {  children: ReactNode  };

export default function SubTitle({ children  }: SubTitleProps) {
  return (
    <div className="py-2 xs:py-[1rem] lg:py-6 min-h-11 blockContainer-x">
      <h3 className="subTitle">{children}</h3>
    </div>
  );
}