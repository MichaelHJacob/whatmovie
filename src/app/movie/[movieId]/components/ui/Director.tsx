import { CreditsType } from "@/lib/validation/creditsSchema";

type DirectorProps = { credits?: CreditsType["crew"] };

export default function Director({ credits }: DirectorProps) {
  if (credits) {
    return (
      <>
        <dt className="label font-bold text-nightDew-200">Diretor:</dt>
        <dd className="data mb-2 font-semibold text-nightDew-200">
          {credits
            .filter((value) => value.job == "Director")
            .map((value) => value.name)
            .join(", ")}
        </dd>
      </>
    );
  }
}
