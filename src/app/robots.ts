import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Applebot", "Bingbot"],
        allow: ["/"],
        crawlDelay: 10,
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "ahrefsbot",
          "dotbot",
          "MJ12bot",
          "SemrushBot",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: "https://whatmovie.com.br/sitemap.xml",
  };
}
