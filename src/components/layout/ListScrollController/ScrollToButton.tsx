"use client";

import { useState } from "react";

import SideButton from "@/components/ui/SideButton";

type ScrollToButtonProps = { id: string; length: number; surface?: boolean };

export default function ScrollToButton({
  id,
  length,
  surface,
}: Readonly<ScrollToButtonProps>) {
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

  function handleScroll(element: HTMLElement | null) {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }

  function handleToRight() {
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
            handleScroll(last);
          } else {
            const last = document.getElementById(id + String(i - 1 + visible));
            handleScroll(last);
            i = length;
          }
        }

        i++;
      } while (i <= length);
    }
  }

  function handleToLeft() {
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
            handleScroll(last);
          } else {
            const last = document.getElementById(id + String(i + 1 - visible));
            handleScroll(last);
            i = 0;
          }
        }
        i--;
      } while (i >= 0);
    }
  }

  return (
    <SideButton
      hiddenLeft={!left}
      hiddenRight={!right}
      onLeft={handleToLeft}
      onRight={handleToRight}
      surfaceColor={surface ? "listBase" : "body"}
      model="cards"
    />
  );
}
