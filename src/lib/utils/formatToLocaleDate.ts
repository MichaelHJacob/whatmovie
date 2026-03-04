export function formatToLocaleDate(
  date: string,
  format: "full" | "long" | "medium" | "short",
): string {
  const d = new Date(date.split("T") ? date : `${date}T00:00:00Z`);
  return d.toLocaleDateString("pt-BR", { dateStyle: format, timeZone: "UTC" });
}
