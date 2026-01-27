import { ComponentProps } from "react";

import { ObjVideoType } from "@/lib/validation/videosSchema";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const videoDisplayStyles = tv({
  slots: {
    container:
      "aspect-video w-full bg-black shadow-card-subtle outline-2 -outline-offset-1 outline-black/70 lg:rounded-2xl",
  },
});

type VideoDisplayProps = ComponentProps<"div"> & {
  video?: ObjVideoType | null;
};

export default function VideoDisplay({
  video,
  ...props
}: Readonly<VideoDisplayProps>) {
  const { container } = videoDisplayStyles();

  return (
    <div {...props} className={clsx(props.className, container())}>
      {video && (
        <iframe
          className="h-full w-full lg:rounded-2xl"
          allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          src={`https://www.youtube.com/embed/${video.key}?rel=0
`}
          title="YouTube video player"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
}
