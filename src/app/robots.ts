import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Applebot", "Bingbot"],
        allow: ["/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        disallow: ["/"],
      },
    ],
    sitemap: [
      "https://whatmovie.com.br/sitemap.xml",
      "https://www.whatmovie.com.br/sitemap.xml",
    ],
  };
}
