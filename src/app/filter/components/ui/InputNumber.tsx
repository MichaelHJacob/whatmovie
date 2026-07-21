import { ComponentProps } from "react";

import { filterMenuBase } from "@/app/filter/components/FilterMenu/filterMenu.styles";
import { buttonStyles } from "@/components/ui/Button";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const inputNumberStyles = tv({
  extend: buttonStyles,
  slots: {
    label: "bg-base-ghost text-base-medium hover:text-neutral-strong-hover",
    input: "h-full appearance-none bg-transparent text-center text-current",
    outline: filterMenuBase().outline(),
  },
});

type InputNumberProps = { labelText: string } & ComponentProps<"input">;

export default function InputNumber({ labelText, ...props }: InputNumberProps) {
  const { button, text, label, input, outline } = inputNumberStyles({
    textBtn: true,
  });
  return (
    <label className={clsx(button(), text(), label(), outline())}>
      <span className="lowercase text-placeholder">{labelText}</span>
      <input
        {...props}
        type="number"
        className={input()}
        pattern="[0-9]*"
        inputMode="decimal"
      />
    </label>
  );
}
