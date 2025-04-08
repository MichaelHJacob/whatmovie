import { CrewType } from "@/components/utils/types";

type DirectorProps = { credits?: CrewType[] };

export default function Director({ credits }: DirectorProps) {
  if (credits && credits.length >= 1 ) {
  return (
    <>
      <dt className="label text-nightDew-200  font-bold">Diretor:</dt>
      <dd className="data mb-2 text-nightDew-200  font-semibold">
        {credits
          .filter((value) => value.job == "Director")
          .map((value) => value.name)
          .join(", ")}
      </dd>
    </>
  )};
}