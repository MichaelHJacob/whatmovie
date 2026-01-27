import { ComponentProps } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const foggyEdgeStyles = tv({
  slots: {
    base: "h-auto w-auto",
    before: "",
    after: "",
    fromTo: "",
  },
  variants: {
    noBackdrop: {
      true: {
        base: "bg-none",
      },
      false: {
        before:
          "before:frame-gradient before:transition-all before:duration-300 before:ease-in-out",
        after:
          "after:frame-gradient after:transition-all after:duration-300 after:ease-in-out",
      },
    },
    side: {
      left: {
        fromTo:
          "before:blockContainer-pl before:bottom-0 before:left-0 before:h-full before:w-auto before:bg-gradient-to-r",
      },
      right: {
        fromTo:
          "after:blockContainer-pr after:-right-[1px] after:bottom-0 after:h-full after:w-auto after:bg-gradient-to-l",
      },
      top: {
        fromTo:
          "before:-top-[1px] before:left-0 before:h-auto before:w-full before:bg-gradient-to-b",
      },
      bottom: {
        fromTo:
          "after:blockContainer-pb after:-bottom-[1px] after:left-0 after:h-auto after:w-full after:bg-gradient-to-t",
      },
      bothX: "",
      bothY: "",
    },
    fadeOut: {
      left: {
        fromTo:
          "before:[mask-image:linear-gradient(to_right,#000000_50%,#000000E6_75%,#0000001A_100%)]",
      },
      right: {
        fromTo:
          "after:[mask-image:linear-gradient(to_left,#000000_50%,#000000E6_75%,#0000001A_100%)]",
      },
      top: {
        fromTo:
          "before:[mask-image:linear-gradient(to_bottom,#000000_50%,#000000E6_75%,#0000001A_100%)]",
      },
      bottom: {
        fromTo:
          "after:[mask-image:linear-gradient(to_top,#000000_50%,#000000E6_75%,#0000001A_100%)]",
      },
    },
    topHead: {
      true: "",
      false: "",
    },
    surfaceColor: {
      listBase: {
        before: "before:frame-gradient-listBase",
        after: "after:frame-gradient-listBase",
      },
      body: {
        before: "before:frame-gradient-body",
        after: "after:frame-gradient-body",
      },
      bodyDense: {
        before: "before:frame-gradient-body-dense",
        after: "after:frame-gradient-body-dense",
      },
      floating: {
        before: "before:frame-gradient-floating",
        after: "after:frame-gradient-floating",
      },
    },
  },
  compoundVariants: [
    {
      side: "top",
      topHead: true,
      class: {
        fromTo: "before:paddingHeader",
      },
    },
    {
      side: "top",
      topHead: false,
      class: {
        fromTo: "before:blockContainer-pt",
      },
    },
  ],
});

export type FoggyEdgeVariants = VariantProps<typeof foggyEdgeStyles>;

type FoggyEdgeProps = FoggyEdgeVariants &
  ComponentProps<"div"> & {
    children: React.ReactNode;
    fadeOutGradient?: boolean;
  };

export default function FoggyEdge({
  children,
  fadeOutGradient = true,
  noBackdrop = false,
  surfaceColor = "body",
  topHead,
  side,
  ...props
}: Readonly<FoggyEdgeProps>) {
  const { base, before, after, fromTo } = foggyEdgeStyles();
  const containerStyle: string[] = [];

  switch (side) {
    case "top":
    case "left":
      containerStyle.push(before({ noBackdrop, surfaceColor }));
      if (fadeOutGradient) containerStyle.push(fromTo({ fadeOut: side }));
      break;
    case "bottom":
    case "right":
      containerStyle.push(after({ noBackdrop, surfaceColor }));
      if (fadeOutGradient) containerStyle.push(fromTo({ fadeOut: side }));
      break;
    case "bothX":
      containerStyle.push(
        `${fromTo({ side: "left" })} ${fromTo({ side: "right" })}`,
      );
      containerStyle.push(before({ noBackdrop, surfaceColor }));
      containerStyle.push(after({ noBackdrop, surfaceColor }));
      if (fadeOutGradient)
        containerStyle.push(
          `${fromTo({ fadeOut: "left" })} ${fromTo({ fadeOut: "right" })}`,
        );
      break;
    case "bothY":
      containerStyle.push(
        `${fromTo({ side: "top", topHead })} ${fromTo({ side: "bottom" })}`,
      );
      containerStyle.push(before({ noBackdrop, surfaceColor }));
      containerStyle.push(after({ noBackdrop, surfaceColor }));
      if (fadeOutGradient)
        containerStyle.push(
          `${fromTo({ fadeOut: "top" })} ${fromTo({ fadeOut: "bottom" })}`,
        );
      break;
    default:
      break;
  }

  return (
    <div
      {...props}
      className={clsx(
        base(),
        fromTo({ side, topHead }),
        containerStyle.join(" "),
        props.className,
      )}
    >
      {children}
    </div>
  );
}
