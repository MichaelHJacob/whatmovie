import slugify from "slugify";

export function formatToIdSlug(id: string | number, text: string) {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    locale: "en-US",
    remove: /[#*+~.()'"!:@]/g,
  });

  return `${id}-${slug}`;
}
