import { ComponentPropsWithRef } from "react";

import Button from "@/components/ui/Button";
import clsx from "clsx";

type ClearSelectedProps = {
  onClear: () => void;
} & ComponentPropsWithRef<"button">;

export default function ClearSelected({
  onClear,
  ...props
}: Readonly<ClearSelectedProps>) {
  function handleClick() {
    onClear();
  }

  return (
    <Button
      textBtn
      theme="base"
      {...props}
      className={clsx(
        props.className,
        "hover:bg-negative-minimal hover:text-negative-accent",
      )}
      onClick={handleClick}
    >
      Limpar
    </Button>
  );
}
