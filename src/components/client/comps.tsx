"use client";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
const BtnScrollTo = dynamic(() => import("@/components/client/button"));

export function ListControl({
  id,
  length,
  children,
  surface,
}: {
  id: string;
  length: number;
  children: ReactNode;
  surface?: boolean;
}) {
  const [enabler, setEnabler] = useState(false);

  function onMouse() {
    const element = document.getElementById(id);
    
    if (element !== null) {
      const width = element.getBoundingClientRect().right;
      let i = 0;
      do {
        const atual = document.getElementById(id + String(i));
        if (atual !== null) {
         
          if (atual.getBoundingClientRect().right > width || atual.getBoundingClientRect().left < 0) {
            setEnabler(true)
            i = length;
          }else{
            setEnabler(false)
          }
        }
        i++;
      } while (i < length);
    }
  }

  return (
    <div
      onMouseEnter={onMouse}
      className="relative group"
    >
      {enabler && <BtnScrollTo id={id} length={length} surface={surface} />}
      {children}
    </div>
  );
}