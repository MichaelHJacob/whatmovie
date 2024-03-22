"use client";

import { useState } from "react";

export default function BtnScrollTo({
  id,
  length,
}: {
  id: string;
  length: number;
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
      let left = document.getElementById(id + String(0));
      if (left !== null) {
        if (left.getBoundingClientRect().left < parentSdL) {
          setLeft(true);
        } else {
          setLeft(false);
        }
      }
      let right = document.getElementById(id + String(length - 1));
      if (right !== null && typeof parentSdR == "number") {
        let rightP = right.getBoundingClientRect().right;
        if (rightP !== null && rightP < parentSdR) {
          setRight(false);
        } else {
          setRight(true);
        }
      }
    });
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
        let atual = document.getElementById(id + String(i));
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
          if (i == length - 1 || i + visible >= length - 1) {
            let last = document.getElementById(id + String(length - 1));
            last !== null && last.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
          } else {
            let last = document.getElementById(id + String(i + visible));
            last !== null && last.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
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
        let atual = document.getElementById(id + String(i));
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
          if (i == 0 || i - visible < 0) {
            let last = document.getElementById(id + String(0));
            last !== null && last.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
          } else {
            let last = document.getElementById(id + String(i - visible));
            last !== null && last.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
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
        className={`w-[--p] xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG] h-[110%] absolute right-[-1px] top-[-5%]   bg-gradient-to-l from-Surface via-Surface/70 to-transparent backdrop-blur-sm z-50 
       flex justify-center items-center group ${
         right
           ? "group-hover:animate-show group-hover:opacity-100 animate-hidden opacity-0 "
           : "opacity-0"
       }`}
      >
        <span
          className=" w-3/4 min-h-11 h-[17%] 
    bg-[url('/toRight.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat  rounded-lg  backdrop-blur-xl  backdrop-saturate-150 bg-Surface80/10  px-0 shadow-lg shadow-transparent group-hover:shadow-onBackground2/20 group-active:bg-theme/20 transition-all duration-300 "
        ></span>
      </button>
      <button
        onClick={toLeft}
        className={`w-[--p] xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG] h-[110%] absolute left-[-1px] top-[-5%]   bg-gradient-to-r from-Surface via-Surface/70 to-transparent backdrop-blur-sm z-50  flex justify-center items-center  group  ${
          left
            ? "group-hover:animate-show group-hover:opacity-100 animate-hidden opacity-0 "
            : "opacity-0"
        }  `}
      >
        <span
          className=" w-3/4 min-h-11 h-[17%] 
    bg-[url('/toLeft.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat  rounded-lg  backdrop-blur-xl  backdrop-saturate-150 bg-Surface80/10  px-0 shadow-lg shadow-transparent group-hover:shadow-onBackground2/20 group-active:bg-theme/20 transition-all duration-300 "
        ></span>
      </button>
    </>
  );
}
