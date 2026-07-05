// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "whatmovie",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        cloudflare: { package: "@pulumi/cloudflare", version: "6.17.0" },
        aws: { package: "@pulumi/aws", version: "7.36.0" },
      },
    };
  },
  async run() {
    const tmdbApiToken = new sst.Secret("TmdbApiToken");
    const web = new sst.aws.Nextjs("WhatMovieWeb", {
      link: [tmdbApiToken],
      path: "./",
      domain:
        $app.stage === "production"
          ? {
              name: "whatmovie.com.br",
              dns: sst.cloudflare.dns({
                proxy: true,
              }),
            }
          : undefined,
    });
    return {
      url: web.url,
    };
  },
});
