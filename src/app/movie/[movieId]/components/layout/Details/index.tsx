import { Suspense } from "react";

import CardInformation from "@/app/movie/[movieId]/components/layout/Details/CardInformation";
import Translations from "@/app/movie/[movieId]/components/layout/Details/Translations";
import Container from "@/components/layout/Container";
import HTitle from "@/components/ui/HTitle";
import { formatTimeToShortText } from "@/lib/utils/formatTimeToShortText";
import { formatToLocaleDate } from "@/lib/utils/formatToLocaleDate";
import { formatUSDtoBR } from "@/lib/utils/formatUSDtoBR";
import { MovieDetailsType } from "@/lib/validation/movieDetailsSchema";

type DetailsProps = {
  movieId: string;
  data: MovieDetailsType;
};

export default async function Details({
  data,
  movieId,
}: Readonly<DetailsProps>) {
  return (
    <Container as="section">
      <HTitle>Mais detalhes</HTitle>
      <dl>
        <div className="listSpacing no-scrollbar">
          <CardInformation>
            {data.original_title && (
              <>
                <dt className="label">Titulo original:</dt>
                <dd className="data mb-2"> {data.original_title}</dd>
              </>
            )}

            {data.release_date && (
              <>
                <dt className="label">Data de lançamento:</dt>
                <dd className="data mb-2">
                  <span className="lowercase">
                    {formatToLocaleDate(data.release_date, "long")}
                  </span>
                </dd>
              </>
            )}
            {data.credits && (
              <>
                <dt className="label">Diretor:</dt>
                <dd className="data mb-2">
                  {data.credits.crew
                    .filter((value) => value.job == "Director")
                    .map((value) => value.name)
                    .join(", ")}
                </dd>
              </>
            )}
            {data.homepage && (
              <dt className="label -ml-2 mb-2">
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="backBtn-hover rounded-lg p-2 underline"
                >
                  Site Oficial
                </a>
              </dt>
            )}
          </CardInformation>
          <CardInformation>
            {data.genres && (
              <>
                <dt className="label">Gêneros:</dt>
                <dd className="data mb-2">
                  {data.genres.map((value) => value.name).join(", ")}
                </dd>
              </>
            )}
            {data.belongs_to_collection?.name && (
              <>
                <dt className="label">Coleção:</dt>
                <dd className="data mb-2">{data.belongs_to_collection.name}</dd>
              </>
            )}
            {data.runtime && (
              <>
                <dt className="label">Duração:</dt>
                <dd className="data mb-2">
                  {data.runtime && formatTimeToShortText(data.runtime)}
                </dd>
              </>
            )}
          </CardInformation>
          <CardInformation>
            {data.production_companies && (
              <>
                <dt className="label">Produzido por:</dt>
                <dd className="data mb-2">
                  {data.production_companies
                    .map((value) => value.name)
                    .join(", ")}
                </dd>
              </>
            )}
            {data.production_countries && (
              <>
                <dt className="label">Pais de produção:</dt>
                <dd className="data mb-2">
                  {data.production_countries
                    .map((value) => value.name)
                    .join(", ")}
                </dd>
              </>
            )}
            {data.original_language && (
              <>
                <dt className="label">Idioma original:</dt>
                <dd className="data mb-2"> {data.original_language}</dd>
              </>
            )}
          </CardInformation>
          <CardInformation>
            {data.budget && (
              <>
                <dt className="label">Orçamento:</dt>
                <dd className="data mb-2">{formatUSDtoBR(data.budget)}</dd>
              </>
            )}
            {data.revenue && (
              <>
                <dt className="label">Receita:</dt>
                <dd className="data mb-2">{formatUSDtoBR(data.revenue)}</dd>
              </>
            )}
          </CardInformation>
        </div>
        <Suspense>
          <Translations movieId={movieId} />
        </Suspense>
      </dl>
    </Container>
  );
}
