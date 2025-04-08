import { ReactNode } from "react";

type ContainerProps = { children: ReactNode;
  paddingTop?: boolean;
 };

export default function Container({ children,
  paddingTop, } : ContainerProps ){
  return (
    <div
      className={`max-w-7xl w-full h-auto mx-auto ${
        paddingTop && "paddingHeader"
      }`}
    >
      {children}
    </div>
  );
}