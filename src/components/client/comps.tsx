"use client";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { MovieType } from "../utils/types";

const BtnScrollTo = dynamic(() => import("./button"));

export function ListControl({
  id,
  length,
  children,
  color,
}: {
  id: string;
  length: number;
  children: ReactNode;
  color: "Surface" | "Background";
}) {
  const [enabler, setEnabler] = useState(false);

  function onMouse() {
    const element = document.getElementById(id);
    
    if (element !== null) {
      let width = element.getBoundingClientRect().right;
      let i = 0;
      do {
        let atual = document.getElementById(id + String(i));
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
      {enabler && <BtnScrollTo id={id} length={length} color={color} />}
      {children}
    </div>
  );
}

