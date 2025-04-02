"use client";

import { useState } from "react";

export default function BtnScrollTo({
  id,
  length,
  surface,
}: {
  id: string;
  length: number;
  surface?: boolean;
}) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const parent = document.getElementById(id);
  const parentSdR = parent?.getBoundingClientRect().right;
  const parentSdL = parent?.getBoundingClientRect().left;

  if (
    parent !== null &&
    typeof parentSdL == "number" &&
    typeof parentSdR == "number"
  ) {
    parent.addEventListener("scroll", () => {
      const left = document.getElementById(id + String(0));
      if (left !== null) {
        if (left.getBoundingClientRect().left < parentSdL) {
          setLeft(true);
        } else {
          setLeft(false);
        }
      }
      const right = document.getElementById(id + String(length - 1));
      if (right !== null && typeof parentSdR == "number") {
        const rightP = right.getBoundingClientRect().right;
        if (rightP !== null && rightP < parentSdR) {
          setRight(false);
        } else {
          setRight(true);
        }
      }
    });
  }

  function scroll(element: HTMLElement | null) {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      })
    }
  }


  function toRight() {
    if (
      parent !== null &&
      typeof parentSdL == "number" &&
      typeof parentSdR == "number"
    ) {
      let i = 0;
      let visible = 0;

      do {
        const atual = document.getElementById(id + String(i));
        if (
          atual !== null &&
          atual.getBoundingClientRect().right < parentSdR &&
          atual.getBoundingClientRect().left > parentSdL
        ) {
          visible++;
        } else if (
          atual !== null &&
          atual.getBoundingClientRect().right > parentSdR
        ) {
          if (i == length - 1 || i - 1 + visible >= length - 1) {
            const last = document.getElementById(id + String(length - 1));
           scroll(last) 

          } else {
            const last = document.getElementById(id + String(i - 1 + visible));
            scroll(last)
            i = length;
          }
        }

        i++;
      } while (i <= length);
    }
  }

  function toLeft() {
    if (
      parent !== null &&
      typeof parentSdL == "number" &&
      typeof parentSdR == "number"
    ) {
      let visible = 0;
      let i = length - 1;
      do {
        const atual = document.getElementById(id + String(i));
        if (
          atual !== null &&
          atual.getBoundingClientRect().right < parentSdR &&
          atual.getBoundingClientRect().left > parentSdL
        ) {
          visible++;
        } else if (
          atual !== null &&
          atual.getBoundingClientRect().left < parentSdL
        ) {
          if (i == 0 || i + 1 - visible <= 0) {
            const last = document.getElementById(id + "0");
            scroll(last)
          } else {
            const last = document.getElementById(id + String(i + 1 - visible));
            scroll(last)
            i = 0;
          }
        }
        i--;
      } while (i >= 0);
    }
  }

  return (
    <>
      <button
        onClick={toRight}
        className={`w-[--p] xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG] h-full absolute right-[-1px] bg-gradient-to-l
          bg-inherit ${surface ? 'from-nightDew-100 via-nightDew-100/70' : 'from-nightDew-200 via-nightDew-200/70'}
           to-transparent z-50 
       flex justify-center items-center group/right ${right
            ? "group-hover:animate-show group-hover:opacity-100 animate-hidden opacity-0 "
            : "opacity-0"
          }`}
      >
        <span
          className={`w-3/4 min-h-11 h-[17%] 
    bg-[url('/icons/toRight.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat  rounded-lg  backdrop-blur-xl  backdrop-saturate-150 bg-white/10 px-0 shadow-lg shadow-transparent group-hover:shadow-nightDew-400/20 group-active/right:bg-selector-200/10 transition-all duration-300`}
        ></span>
      </button>
      <button
        onClick={toLeft}
        className={`w-[--p] xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG] h-full absolute left-[-1px] bg-gradient-to-r ${surface ? 'from-nightDew-100 via-nightDew-100/70' : 'from-nightDew-200 via-nightDew-200/70'} to-transparent backdrop-blur-sm z-50  flex justify-center items-center  group/left ${left
          ? "group-hover:animate-show group-hover:opacity-100 animate-hidden opacity-0"
          : "opacity-0"
          }  `}
      >
        <span
          className={`w-3/4 min-h-11 h-[17%] 
    bg-[url('/icons/toLeft.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat  rounded-lg  backdrop-blur-xl  backdrop-saturate-150 bg-white/10  px-0 shadow-lg shadow-transparent group-hover:shadow-nightDew-400/20 group-active/left:bg-selector-200/20 transition-all duration-300`}
        ></span>
      </button>
    </>
  );
}
