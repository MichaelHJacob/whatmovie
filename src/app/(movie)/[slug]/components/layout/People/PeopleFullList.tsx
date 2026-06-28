"use client";

import { useState } from "react";

import PersonCard from "@/app/(movie)/[slug]/components/layout/People/PeopleList/PersonCard";
import Modal from "@/components/layout/Modal";
import BreakHr from "@/components/ui/BreakHr";
import Button from "@/components/ui/Button";
import HTitle from "@/components/ui/HTitle";
import { CreditsType } from "@/lib/validation/creditsSchema";
import { tv } from "tailwind-variants";

const PeopleFullListStyles = tv({
  slots: {
    button:
      "peer absolute bottom-[--p] right-[--p] md:bottom-[--pMD] md:right-[--pMD] md:translate-y-1/2",
    ul: "all-gap blockContainer-p box-border list-none sm:columns-2 lg:columns-3",
  },
});

export default function PeopleFullList({
  cast,
  crew,
}: Readonly<Pick<CreditsType, "cast" | "crew">>) {
  const [checked, setChecked] = useState(false);
  const { button, ul } = PeopleFullListStyles();

  return (
    <>
      <Button
        data-bgscrim={checked}
        onClick={() => setChecked(true)}
        className={button()}
        size="short"
        textBtn
        round
        shadowBtn
        theme="neutral-accent"
      >
        Mais
      </Button>
      <Modal
        mode="modal"
        onClose={() => setChecked(false)}
        active={checked}
        scrimStyles="z-30"
      >
        <>
          <HTitle>Elenco</HTitle>
          <ul className={ul()}>
            {cast.length >= 1 &&
              cast.map((value) => (
                <PersonCard
                  mode="list"
                  key={value.cast_id}
                  kind="cast"
                  {...value}
                />
              ))}
          </ul>
          <BreakHr />
          <HTitle>Produção</HTitle>
          <ul className={ul()}>
            {crew.length >= 1 &&
              crew.map((value) => (
                <PersonCard
                  mode="list"
                  key={value.credit_id}
                  kind="crew"
                  {...value}
                />
              ))}
          </ul>
        </>
      </Modal>
    </>
  );
}
