"use client";

import { useState } from "react";

type ScrollToButtonProps = { id: string; length: number; surface?: boolean };

export default function ScrollToButton({
  id,
  length,
  surface,
}: ScrollToButtonProps) {
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
      });
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
            scroll(last);
          } else {
            const last = document.getElementById(id + String(i - 1 + visible));
            scroll(last);
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
            scroll(last);
          } else {
            const last = document.getElementById(id + String(i + 1 - visible));
            scroll(last);
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
        className={`bg-inherit absolute right-[-1px] h-full w-[--p] bg-gradient-to-l xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG] ${surface ? "from-nightDew-100 via-nightDew-100/70" : "from-nightDew-200 via-nightDew-200/70"} group/right z-50 flex items-center justify-center to-transparent ${
          right
            ? "animate-hidden opacity-0 group-hover:animate-show group-hover:opacity-100"
            : "opacity-0"
        }`}
      >
        <span
          className={`h-[17%] min-h-11 w-3/4 rounded-lg bg-white/10 bg-[url('/icons/toRight.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat px-0 shadow-lg shadow-transparent backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 group-hover:shadow-nightDew-400/20 group-active/right:bg-selector-200/10`}
        ></span>
      </button>
      <button
        onClick={toLeft}
        className={`absolute left-[-1px] h-full w-[--p] bg-gradient-to-r xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG] ${surface ? "from-nightDew-100 via-nightDew-100/70" : "from-nightDew-200 via-nightDew-200/70"} group/left z-50 flex items-center justify-center to-transparent backdrop-blur-sm ${
          left
            ? "animate-hidden opacity-0 group-hover:animate-show group-hover:opacity-100"
            : "opacity-0"
        } `}
      >
        <span
          className={`h-[17%] min-h-11 w-3/4 rounded-lg bg-white/10 bg-[url('/icons/toLeft.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat px-0 shadow-lg shadow-transparent backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 group-hover:shadow-nightDew-400/20 group-active/left:bg-selector-200/20`}
        ></span>
      </button>
    </>
  );
}
