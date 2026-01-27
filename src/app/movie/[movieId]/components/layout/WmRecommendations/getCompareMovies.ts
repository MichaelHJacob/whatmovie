import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

export default function getCompareMovies(
  value: DiscoverMovieType,
  maxP: number,
  maxCV: number,
  genres_id: number[],
  pointRoot: number[],
) {
  function date() {
    function period(rcmDate: string) {
      const date = new Date();
      const year = date.getFullYear();
      const rcmYear = rcmDate.split("-");
      if (rcmYear.length !== 3 || typeof year !== "number") {
        return 11;
      } else {
        return year - Number.parseInt(rcmYear[0]);
      }
    }

    if (value.release_date === null) return 0;
    const time = period(value.release_date);
    return time > 30 ? 50 : ((30 - time) / 30) * 0.5 * 100 + 50;
  }

  function pop() {
    return Math.trunc((value.popularity / maxP) * 100);
  }

  function vote() {
    return Math.trunc((value.vote_count / maxCV) * 100);
  }

  function genre() {
    function calcScore(rcmIndex: number, rootIndex: number, weight: number) {
      const variation = Math.abs(rcmIndex - rootIndex) + 1;

      if (variation === 1) {
        return pointRoot[rootIndex];
      } else {
        return (pointRoot[rootIndex] / variation) * weight;
      }
    }

    let score: number = 0;

    genres_id.forEach((root, rootIndex) => {
      value.genre_ids.forEach((rcm, rcmIndex) => {
        if (root === rcm) {
          score += calcScore(rcmIndex, rootIndex, 1.9);
        }

        if (rootIndex === 0) {
          switch (root) {
            // 27 Horror | 28 Action | 36 History | 53 Thriller | 80 Crime | 10749 Romance for Comedy
            case 35:
              if ([27, 28, 36, 53, 80, 10749].includes(rcm))
                score -= calcScore(rcmIndex, rootIndex, 0.5);
              break;
            // 27 Horror | 36 story | 53 Thriller | 80 Crime | 10749 Romance | 18 Drama for Animation
            case 16:
              if ([27, 36, 53, 80, 10749, 18, 10752].includes(rcm))
                score -= calcScore(rcmIndex, rootIndex, 0.5);
              break;
            // 27 Horror | 80 Crime | 53 Thriller for Family")
            case 10751:
              if ([27, 80, 53].includes(rcm))
                score -= calcScore(rcmIndex, rootIndex, 0.5);
              break;
            // Romance for Adventure
            case 12:
              if (rcm === 10749) {
                score -= calcScore(rcmIndex, rootIndex, 0.5);
              }
              break;
            // Crime for Fantasy
            case 14:
              if (rcm === 80) {
                score -= calcScore(rcmIndex, rootIndex, 0.5);
              }
              break;
            // Science Fiction | Action for Romance
            case 10749:
              if ([878, 28].includes(rcm))
                score -= calcScore(rcmIndex, rootIndex, 0.5);
              break;
          }
        }
      });
    });

    const contrast = Math.abs(genres_id.length - value.genre_ids.length);

    return score <= 0 || contrast === 0
      ? Math.trunc(score)
      : Math.trunc(
          score -
            score *
              (genres_id.length > value.genre_ids.length
                ? contrast / genres_id.length
                : contrast / value.genre_ids.length),
        );
  }

  const rate = Math.trunc(value.vote_average * 10);

  const result =
    date() * 0.02 + rate * 0.01 + pop() * 0.04 + vote() * 0.43 + genre() * 0.55;

  return Math.trunc(result);
}
