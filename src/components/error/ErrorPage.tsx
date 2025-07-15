import { ComponentPropsWithoutRef, ElementType } from "react";

import AlertSing from "@/assets/status-signs/alert.svg";
import ErrorSign from "@/assets/status-signs/error.svg";
import Container from "@/components/layout/Container";
import HTitle from "@/components/ui/HTitle";
import { VariantProps, tv } from "tailwind-variants";

export const container = tv({
  slots: {
    background: "relative pt-11",
    colorTextSing:
      "relative -left-3 -top-6 z-50 w-56 -rotate-3 rounded-xl bg-blue-400 px-1 pb-1 text-center font-sans text-xs font-bold drop-shadow-lg",
  },
  variants: {
    model: {
      notFound: {
        background: "bg-gradient-to-b from-amber-300 to-amber-500",
        colorTextSing: "text-amber-100",
      },
      errorPage: {
        background: "bg-gradient-to-b from-amber-500 to-amber-700",
        colorTextSing: "text-nightDew-700/50",
      },
    },
  },
});

type ContainerVariants = VariantProps<typeof container>;

type ErrorPageProps<T extends ElementType = "div"> = ContainerVariants &
  ComponentPropsWithoutRef<T> & {
    onRetry?: () => void;
    as?: T;
    textH1?: string;
    textCode?: string;
    textMsg1?: string;
    textMsg2?: string;
  };

export default function ErrorPage<T extends ElementType = "div">({
  onRetry,
  as,
  model,
  textH1 = "Erro inesperado",
  textCode = "Error",
  textMsg1 = "Parece que tivemos algum problema.",
  textMsg2 = "Tente recarregar a página, se o erro persistir, tente novamente mais tarde.",
}: ErrorPageProps<T>) {
  const { background, colorTextSing } = container({ model });

  return (
    <Container
      as={as || "div"}
      model="initial"
      className={background()}
      innerStyles="flex flex-col"
    >
      <HTitle insideAs="header" as="h1" className="text-nightDew-950">
        {textH1}
      </HTitle>
      <div className="blockContainer-x blockContainer-b flex w-full flex-1 flex-col items-center justify-between">
        <div className="relative mt-9 h-full max-h-52 w-52">
          {model === "notFound" ? (
            <AlertSing className="absolute h-52 w-52 fill-amber-300 drop-shadow-2xl" />
          ) : (
            <ErrorSign className="absolute h-52 w-52 fill-nightDew-700/10 drop-shadow-2xl" />
          )}
          <p className={colorTextSing()}>
            Código do erro:
            <span className="block rounded-lg bg-red-400 text-6xl font-extrabold">
              {textCode}
            </span>
          </p>
        </div>
        <div className="all-gap z-10 flex min-h-min w-full flex-col items-center">
          <p className="text-center font-sans text-2xl font-black text-stone-950">
            Oops!
          </p>
          <p className="text-center font-sans text-base font-black text-stone-950">
            {textMsg1}
            <br />
            {textMsg2}
          </p>
          {onRetry && (
            <button
              onClick={() => onRetry()}
              className="backBtn z-50 w-min bg-nightDew-700/10 shadow-sm shadow-rose-900 active:bg-amber-700"
            >
              <span className="textBtn text-nightDew-100">
                Recarregar página
              </span>
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
