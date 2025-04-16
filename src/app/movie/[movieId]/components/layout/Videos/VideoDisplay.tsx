import { VideosResultsType } from "@/types/globalTypes";

type VideoDisplayProps = { video: VideosResultsType };

export default function VideoDisplay({ video }: VideoDisplayProps) {
  return (
    <div className="md:blockContainer-x">
      <iframe
        className="aspect-video w-full bg-black md:rounded-2xl md:shadow-light md:shadow-nightDew-500/50"
        allow="fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="YouTube video player"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
