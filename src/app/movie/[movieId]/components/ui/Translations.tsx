import { API_ENDPOINTS } from "@/config/config";
import { TranslationsType } from "@/types/globalTypes";

async function getTranslations(movieID: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    API_ENDPOINTS.finding.byId(movieID) + "/translations",
    options,
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

type TranslationsProps = {
  movieId: string;
};

export default async function Translations({ movieId }: TranslationsProps) {
  const result: TranslationsType = await getTranslations(movieId);

  if (typeof result.translations == "object") {
    return (
      <>
        <dt className="label mb-1">Traduções:</dt>
        <dd className="data mb-2">
          <>
            {result.translations
              .map((value) => value.name + "-" + value.iso_3166_1)
              .join(", ")}
          </>
        </dd>
      </>
    );
  }
}
