export function toObject(urlParams: URLSearchParams): {
  [k: string]: string;
} {
  return Object.fromEntries(urlParams.entries());
}
