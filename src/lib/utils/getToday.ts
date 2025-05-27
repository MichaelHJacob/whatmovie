export default function getToday(days = 0): string {
  const date: Date = new Date();

  date.setDate(date.getDate() + days);

  return `${date.toISOString().split("T")[0]}`;
}
