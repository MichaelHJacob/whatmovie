import { ChangeEvent, ComponentPropsWithoutRef } from "react";

import { buttonStyles } from "@/components/ui/Button";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

export const checkButtonStyles = tv({
  extend: buttonStyles,
  slots: {
    label: "",
    input: "peer absolute appearance-none bg-transparent opacity-0",
    text: "",
  },
  variants: {
    theme: {
      neutral: {
        label: "bg-neutral-minimal has-[:checked]:bg-neutral-accent",
        text: "text-neutral-strong hover:text-neutral-strong-hover has-[:checked]:text-inverted-strong",
      },
    },
  },
});

type CheckButtonProps = ComponentPropsWithoutRef<"label"> &
  VariantProps<typeof checkButtonStyles> &
  Readonly<{
    labelText?: string;
    name: string;
    checked: boolean;
    onToggleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  }>;

export default function CheckButton({
  labelText,
  checked,
  name,
  onToggleCheckbox,
  textBtn,
  blur,
  theme,
  size,
  ...props
}: CheckButtonProps) {
  const { input, text, button, label } = checkButtonStyles({
    textBtn,
    blur,
    shadowBtn: false,
    theme,
    size,
  });

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    onToggleCheckbox(e);
  }

  return (
    <label
      {...props}
      className={clsx(label(), button(), textBtn && text(), props.className)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckbox}
        name={name}
        className={input()}
      />
      {textBtn ? labelText : <span className="sr-only">{labelText}</span>}
    </label>
  );
}
