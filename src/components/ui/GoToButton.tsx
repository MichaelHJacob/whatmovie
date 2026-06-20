import { ComponentProps } from "react";

import BackToIcon from "@/assets/icons/toLeft.svg";
import NextToIcon from "@/assets/icons/toRight.svg";
import Button from "@/components/ui/Button";
import clsx from "clsx";

type GoToButtonProps = ComponentProps<"button"> & {
  to: "left" | "right";
  model: "cards" | "banner";
};

export default function GoToButton({
  model = "banner",
  to,
  ...props
}: Readonly<GoToButtonProps>) {
  return to === "left" ? (
    <Button
      {...props}
      theme={model === "banner" ? "navigation-banner" : "navigation-cards"}
      blur
      size="tall"
      className={clsx("group/btn", props.className)}
    >
      <BackToIcon />
    </Button>
  ) : (
    <Button
      {...props}
      theme={model === "banner" ? "navigation-banner" : "navigation-cards"}
      blur
      size="tall"
      className={clsx("group/btn", props.className)}
    >
      <NextToIcon />
    </Button>
  );
}
