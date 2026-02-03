import { ComponentProps } from "react";

import { tv } from "tailwind-variants";

const fieldsetStyles = tv({
  slots: {
    fieldset: "box-border flex h-11 w-full items-center justify-center",
  },
  variants: {
    active: {
      true: {
        fieldset: "all-gap relative left-0 top-0 z-50",
      },
      false: {
        fieldset: "gap-0",
      },
    },
  },
});

type FieldsetProps = ComponentProps<"fieldset"> & {
  children: React.ReactNode;
  isExpanded: boolean;
};

export default function Fieldset({
  children,
  isExpanded,
  ...props
}: Readonly<FieldsetProps>) {
  const { fieldset } = fieldsetStyles({
    active: isExpanded,
  });
  return (
    <fieldset className={fieldset({ class: props.className })}>
      {children}
    </fieldset>
  );
}
