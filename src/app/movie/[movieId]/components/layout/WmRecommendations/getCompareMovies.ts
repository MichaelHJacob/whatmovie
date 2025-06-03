import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

export default function getCompareMovies(
  value: DiscoverMovieType,
  maxP: number,
  maxCV: number,
  genres_id: number[],
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
      genres_id.length > value.genre_ids.length
        ? genres_id.length - value.genre_ids.length
        : value.genre_ids.length - genres_id.length;

    let score: number = 0;

    genres_id.forEach((rootValue, iRoot) => {
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
              (genres_id.length > value.genre_ids.length
                ? contrast / genres_id.length
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
    if (value.release_date === null) return 0;
    const time = period(value.release_date);
    return time > 30 ? 50 : ((30 - time) / 30) * 0.5 * 100 + 50;
  }

  const rate = Math.trunc(value.vote_average * 10);

  const result =
    date() * 0.02 + rate * 0.01 + pop() * 0.04 + vote() * 0.43 + genre() * 0.55;

  return Math.trunc(result);
}
