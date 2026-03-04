export function formatTimeToShortText(time: number) {
  if (time < 60) {
    return String(time + "min ");
  } else {
    return String(Math.floor(time / 60) + "h " + (time % 60) + "min ");
  }
}
