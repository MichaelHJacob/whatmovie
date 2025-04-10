import { ReactNode } from "react";

type SubTitleProps = { children: ReactNode };

export default function SubTitle({ children }: SubTitleProps) {
  return (
    <div className="blockContainer-x min-h-11 py-2 xs:py-[1rem] lg:py-6">
      <h3 className="subTitle">{children}</h3>
    </div>
  );
}
