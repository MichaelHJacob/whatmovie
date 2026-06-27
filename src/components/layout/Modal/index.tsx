import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import Close from "@/assets/icons/close.svg";
import BackdropScrim from "@/components/layout/Modal/BackdropScrim";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import { RemoveScroll } from "react-remove-scroll";
import { VariantProps, tv } from "tailwind-variants";

const modalStyles = tv({
  slots: {
    modalContainer: "peer h-auto w-auto",
    scroller: "",
    innerContainer: "",
  },
  variants: {
    mode: {
      menu: {},
      modal: {},
    },
    active: {
      true: {
        modalContainer: "",
        innerContainer: "min-h-96",
      },
      false: {
        modalContainer: "relative bg-transparent",
      },
    },
  },
  compoundVariants: [
    {
      mode: "modal",
      active: true,
      class: {
        scroller:
          "fixed left-0 top-0 z-40 box-border grid h-full w-screen grid-cols-[min(80rem,100%)] items-center justify-center overflow-y-scroll",
        modalContainer:
          "col-span-1 row-span-1 m-6 box-border animate-fade-up rounded-3xl bg-overlay p-5 animate-delay-100 animate-duration-500 md:m-11",
      },
    },
  ],
});

type ModalProps<T extends ElementType> = {
  as?: T;
  scrimStyles?: string;
  children?: ReactNode;
  onClose?: () => void;
} & ComponentPropsWithoutRef<T> &
  VariantProps<typeof modalStyles>;

export default function Modal<T extends ElementType = "div">({
  as,
  scrimStyles,
  children,
  onClose,
  active = false,
  mode,
  ...props
}: ModalProps<T>) {
  const Component = as ?? "div";

  const { modalContainer, scroller, innerContainer } = modalStyles({
    active,
    mode,
  });

  function handleClose() {
    if (!onClose) return;
    onClose();
  }

  const modal = (
    <Component {...props} className={clsx(modalContainer(), props.className)}>
      {mode === "modal"
        ? active && (
            <>
              <div className="absolute bottom-0 right-0 top-0 z-40 h-full">
                <Button
                  blur
                  onClick={handleClose}
                  theme="neutral-subtle"
                  round
                  className="sticky top-4 m-3"
                >
                  <Close />
                </Button>
              </div>
              <div className={innerContainer()}>{children}</div>
            </>
          )
        : children}
    </Component>
  );

  return (
    <>
      <RemoveScroll enabled={active} forwardProps>
        {mode === "modal" ? <div className={scroller()}>{modal}</div> : modal}
      </RemoveScroll>
      <BackdropScrim mode={mode} className={scrimStyles} />
    </>
  );
}
