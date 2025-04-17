import ListMovie from "@/components/ui/ListMovie";
import ListScrollController from "@/components/ui/ListScrollController/index";
import SubTitle from "@/components/ui/SubTitle";
import { API_ENDPOINTS } from "@/config/config";
import {
  RecommendationsMovie,
  RecommendationsMovieRate,
  RecommendationsType,
} from "@/types/globalTypes";

async function getRecommendations(movieID: string, page: number = 1) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 3600 },
  };
  const res = await fetch(
    API_ENDPOINTS.finding.byId(movieID) +
      `/recommendations?language=pt-BR&page=${page.toString()}`,
    options,
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

function calcProportionalParts(X: number) {
  let soma = 0;
  for (let i = 1; i <= X; i++) {
    soma += i;
  }

  const Y = [];
  for (let i = 1; i <= X; i++) {
    const Yi = (100 * (X - i + 1)) / soma;
    Y.push(Yi);
  }

  return Y;
}

function compare(
  value: RecommendationsMovie,
  maxP: number,
  maxCV: number,
  root: {
    adult: boolean;
    popularity: number;
    release_date: string;
    vote_count: number;
    vote_average: number;
    genres_id: number[];
  },
  pointRoot: number[],
) {
  function period(rcmDate: string) {
    const date = new Date();
    const year = date.getFullYear();
    const rcmYear = rcmDate.split("-");
    if (rcmYear.length !== 3 || typeof year !== "number") {
      return 11;
    } else {
      return year - parseInt(rcmYear[0]);
    }
  }

  function genre() {
    const contrast =
      root.genres_id.length > value.genre_ids.length
        ? root.genres_id.length - value.genre_ids.length
        : value.genre_ids.length - root.genres_id.length;

    let score: number = 0;

    root.genres_id.forEach((rootValue, iRoot) => {
      value.genre_ids.forEach((rcm, iRcm) => {
        if (rootValue == rcm) {
          const variation = 1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
          score =
            variation == 1
              ? score + pointRoot[iRoot]
              : score + (pointRoot[iRoot] / variation) * 1.9;
        }

        if (iRoot == 0) {
          switch (rootValue) {
            // 27 Horror | 28 Action | 36 History | 53 Thriller | 80 Crime | 10749 Romance for Comedy
            case 35:
              switch (rcm) {
                case 27:
                case 28:
                case 36:
                case 53:
                case 80:
                case 10749:
                  const variation =
                    1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
                  score =
                    variation == 1
                      ? score - pointRoot[iRoot]
                      : score - (pointRoot[iRoot] / variation) * 0.5;
                  break;
              }
              break;
            // 27 Horror | 36 story | 53 Thriller | 80 Crime | 10749 Romance | 18 Drama for Animation
            case 16:
              switch (rcm) {
                case 27:
                case 36:
                case 53:
                case 80:
                case 10749:
                case 18:
                case 10752:
                  const variation =
                    1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
                  score =
                    variation == 1
                      ? score - pointRoot[iRoot]
                      : score - (pointRoot[iRoot] / variation) * 0.5;
                  break;
              }
              break;
            // 27 Horror | 80 Crime | 53 Thriller for Family")
            case 10751:
              switch (rcm) {
                case 27:
                case 80:
                case 53:
                  const variation =
                    1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
                  score =
                    variation == 1
                      ? score - pointRoot[iRoot]
                      : score - (pointRoot[iRoot] / variation) * 0.5;
                  break;
              }
              break;
            // Romance for Adventure
            case 12:
              switch (rcm) {
                case 10749:
                  const variation =
                    1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
                  score =
                    variation == 1
                      ? score - pointRoot[iRoot]
                      : score - (pointRoot[iRoot] / variation) * 0.5;
                  break;
              }
              break;
            // Crime for Fantasy
            case 14:
              switch (rcm) {
                case 80:
                  const variation =
                    1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
                  score =
                    variation == 1
                      ? score - pointRoot[iRoot]
                      : score - (pointRoot[iRoot] / variation) * 0.5;
                  break;
              }
              break;
            // Science Fiction | Action for Romance
            case 10749:
              switch (rcm) {
                case 878:
                case 28:
                  const variation =
                    1 + (iRcm > iRoot ? iRcm - iRoot : iRoot - iRcm);
                  score =
                    variation == 1
                      ? score - pointRoot[iRoot]
                      : score - (pointRoot[iRoot] / variation) * 0.5;
                  break;
              }
              break;
          }
        }
      });
    });

    return score <= 0 || contrast == 0
      ? Math.trunc(score)
      : Math.trunc(
          score -
            score *
              (root.genres_id.length > value.genre_ids.length
                ? contrast / root.genres_id.length
                : contrast / value.genre_ids.length),
        );
  }

  function pop() {
    return Math.trunc((value.popularity / maxP) * 100);
  }

  function vote() {
    return Math.trunc((value.vote_count / maxCV) * 100);
  }

  function date() {
    const time = period(value.release_date);
    return time > 30 ? 50 : ((30 - time) / 30) * 0.5 * 100 + 50;
  }

  const rate = Math.trunc(value.vote_average * 10);

  const result =
    date() * 0.02 + rate * 0.01 + pop() * 0.04 + vote() * 0.43 + genre() * 0.55;

  return Math.trunc(result);
}

type RecommendationsProps = {
  movieID: string;
  rootFilm: {
    adult: boolean;
    popularity: number;
    release_date: string;
    vote_count: number;
    vote_average: number;
    genres_id: number[];
  };
};

export default async function Recommendations({
  movieID,
  rootFilm,
}: RecommendationsProps) {
  const DtRecommendationsP1: RecommendationsType =
    await getRecommendations(movieID);

  if (DtRecommendationsP1.results.length > 1) {
    const maxCont1: number =
      DtRecommendationsP1.results
        .sort((valueA, valueB) => {
          return valueA.vote_count - valueB.vote_count;
        })
        .reverse()[0].vote_count || 0;

    const maxPop1: number = DtRecommendationsP1.results
      .sort((valueA, valueB) => {
        return valueA.popularity - valueB.popularity;
      })
      .reverse()[0].popularity;

    const DtRecommendationsP2: RecommendationsType =
      DtRecommendationsP1.total_pages >= 2 &&
      (await getRecommendations(movieID, 2));

    const maxCont2: number = DtRecommendationsP2
      ? DtRecommendationsP2.results
          .sort((valueA, valueB) => {
            return valueA.vote_count - valueB.vote_count;
          })
          .reverse()[0].vote_count
      : 0;

    const maxPop2: number = DtRecommendationsP2
      ? DtRecommendationsP2.results
          .sort((valueA, valueB) => {
            return valueA.popularity - valueB.popularity;
          })
          .reverse()[0].popularity
      : 0;

    const maxCont: number = maxCont1 > maxCont2 ? maxCont1 : maxCont2;
    const maxPop: number = maxPop1 > maxPop2 ? maxPop1 : maxPop2;
    const arrayPoint: number[] = calcProportionalParts(
      rootFilm.genres_id.length,
    );

    const recommendation: RecommendationsMovieRate[] = DtRecommendationsP2
      ? [
          ...DtRecommendationsP1.results.map((value) => {
            return {
              ...value,
              recommended: compare(
                value,
                maxPop,
                maxCont,
                rootFilm,
                arrayPoint,
              ),
            };
          }),
          ...DtRecommendationsP2.results.map((value) => {
            return {
              ...value,
              recommended: compare(
                value,
                maxPop,
                maxCont,
                rootFilm,
                arrayPoint,
              ),
            };
          }),
        ]
      : [
          ...DtRecommendationsP1.results.map((value) => {
            return {
              ...value,
              recommended: compare(
                value,
                maxPop,
                maxCont,
                rootFilm,
                arrayPoint,
              ),
            };
          }),
        ];

    const relatedFilter = recommendation
      .filter((value) => value.recommended >= 15)
      .filter((value) => value.vote_count >= 100)
      .sort((valueA, valueB) => {
        return valueA.recommended - valueB.recommended;
      })
      .reverse();

    if (relatedFilter.length >= 1) {
      return (
        <section className="relative bg-nightDew-100 before:absolute before:bottom-0 before:left-[50%] before:z-[-1] before:h-full before:w-screen before:translate-x-[-50%] before:bg-nightDew-100">
          <SubTitle>Recomendações</SubTitle>
          <ListScrollController
            id={"Recomendacoes"}
            length={relatedFilter.length}
            surface
          >
            <ListMovie data={relatedFilter} id={"Recomendacoes"} />
          </ListScrollController>
        </section>
      );
    }
  }
}
