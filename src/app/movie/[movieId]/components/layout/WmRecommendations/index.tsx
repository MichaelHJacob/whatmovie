import getCompareMovies from "@/app/movie/[movieId]/components/layout/WmRecommendations/getCompareMovies";
import Container from "@/components/layout/Container";
import ListScrollController from "@/components/layout/ListScrollController/index";
import HTitle from "@/components/ui/HTitle";
import ListMovie from "@/components/ui/ListMovie";
import { getMovieRecommendations } from "@/lib/api/tmdb/use-cases/getMovieRecommendations";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";
import { MovieDetailsType } from "@/lib/validation/movieDetailsSchema";

function calcProportionalParts(X: number) {
  let soma = 0;
  for (let i = 1; i <= X; i++) {
    soma += i;
  }

  const y = [];
  for (let i = 1; i <= X; i++) {
    y.push((100 * (X - i + 1)) / soma);
  }

  return y;
}

type RecommendationsProps = {
  movieID: string;
} & Pick<MovieDetailsType, "genres">;

export default async function Recommendations({
  movieID,
  genres,
}: Readonly<RecommendationsProps>) {
  const [DtRecommendationsP1] = await getMovieRecommendations({ id: movieID });

  if (!DtRecommendationsP1) return null;

  const genres_id = genres?.map((value) => value.id) || [];
  const arrayPoint: number[] = calcProportionalParts(genres_id.length);
  let maxCont: number;
  let maxPop: number;
  const recommendation: ({ recommended: number } & DiscoverMovieType)[] = [];

  maxCont = DtRecommendationsP1.results
    .sort((valueA, valueB) => {
      return valueA.vote_count - valueB.vote_count;
    })
    .reverse()[0].vote_count;

  maxPop = DtRecommendationsP1.results
    .sort((valueA, valueB) => {
      return valueA.popularity - valueB.popularity;
    })
    .reverse()[0].popularity;

  recommendation.push(
    ...DtRecommendationsP1.results.map((value) => {
      return {
        ...value,
        recommended: getCompareMovies(
          value,
          maxPop,
          maxCont,
          genres_id,
          arrayPoint,
        ),
      };
    }),
  );

  if (DtRecommendationsP1.total_pages > 1) {
    const [DtRecommendationsP2] = await getMovieRecommendations({
      id: movieID,
      page: 2,
    });

    if (!DtRecommendationsP2) return;

    maxCont = Math.max(
      maxCont,
      DtRecommendationsP2?.results
        .sort((valueA, valueB) => {
          return valueA.vote_count - valueB.vote_count;
        })
        .reverse()[0].vote_count,
    );

    maxPop = Math.max(
      maxPop,
      DtRecommendationsP2.results
        .sort((valueA, valueB) => {
          return valueA.popularity - valueB.popularity;
        })
        .reverse()[0].popularity,
    );

    recommendation.push(
      ...DtRecommendationsP2.results.map((value) => {
        return {
          ...value,
          recommended: getCompareMovies(
            value,
            maxPop,
            maxCont,
            genres_id,
            arrayPoint,
          ),
        };
      }),
    );
  }

  const relatedFilter = recommendation
    .filter((value) => value.recommended >= 15)
    .filter((value) => value.vote_count >= 100)
    .sort((valueA, valueB) => {
      return valueA.recommended - valueB.recommended;
    })
    .reverse();

  if (relatedFilter.length >= 1) {
    return (
      <Container as="aside" surface="listBase">
        <HTitle>Recomendações</HTitle>
        <ListScrollController
          id={"Recomendacoes"}
          length={relatedFilter.length}
          surface
        >
          <ListMovie data={relatedFilter} id={"Recomendacoes"} />
        </ListScrollController>
      </Container>
    );
  }
}
