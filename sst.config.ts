// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "whatmovie",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const tmdbApiToken = new sst.Secret("TmdbApiToken");
    const web = new sst.aws.Nextjs("WhatMovieWeb", {
      link: [tmdbApiToken],
    });
    return {
      url: web.url,
    };
  },
});
