import { ComponentProps } from "react";

import clsx from "clsx";
import { RemoveScroll } from "react-remove-scroll";
import { tv } from "tailwind-variants";

const formStyles = tv({
  slots: {
    formContainer: "peer h-auto w-auto bg-transparent",
  },
  variants: {
    active: {
      true: {
        formContainer:
          "fixed right-0 top-0 z-50 h-dvh bg-floating-expanded backdrop-blur-xl xl:pr-[calc((100vw-1280px)/2+var(--pMD))]",
      },
      false: {
        formContainer: "relative bg-transparent before:hidden",
      },
    },
  },
});

type FormProps = ComponentProps<"form"> & {
  children: React.ReactNode;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export default function Form({
  children,
  isExpanded,
  onToggleExpand,
  ...props
}: Readonly<FormProps>) {
  const { formContainer } = formStyles({
    active: isExpanded,
  });
  return (
    <RemoveScroll enabled={isExpanded} forwardProps>
      <form
        {...props}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          if (isExpanded) onToggleExpand();
        }}
        className={clsx(formContainer(), props.className)}
      >
        {children}
      </form>
    </RemoveScroll>
  );
}
