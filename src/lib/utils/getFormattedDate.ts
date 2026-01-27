export default function getFormattedDate(
  date: string,
  format: "full" | "long" | "medium" | "short",
): string {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString("pt-BR", { dateStyle: format, timeZone: "UTC" });
}
