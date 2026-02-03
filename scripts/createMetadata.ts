import dotenv from "dotenv";
import fs from "node:fs";
import { inspect } from "node:util";
import path from "path";
import prettier from "prettier";

import { API_ENDPOINTS } from "../src/config/apiEndpoints";

dotenv.config({ path: [".env.local"] });

const OUTPUT_PATH = path.join(__dirname, "../src/data/movieMetadata.ts");

async function getMovieProviders() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  };
  const res = await fetch(
    `${API_ENDPOINTS.metadata.movieProviders}?language=pt-BR&watch_region=BR`,
    options,
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }

  return res.json();
}

async function getGenres() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    `${API_ENDPOINTS.metadata.movieGenres}?language=pt-BR`,
    options,
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }

  return res.json();
}

async function run() {
  const listGenres = await getGenres();
  const listMovieProvider = await getMovieProviders();

  const fileContent = `
  export const listGenres = ${inspect(listGenres, {
    depth: null,
    compact: true,
    sorted: false,
    breakLength: 80,
  })} as const;
  
  export const listMovieProvider = ${inspect(listMovieProvider, {
    depth: null,
    compact: true,
    sorted: false,
    breakLength: 80,
  })} as const;`;

  const formattedCode = await prettier.format(fileContent, {
    parser: "typescript",
  });

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, formattedCode);
}

run().catch((err) => {
  console.error("Erro ao gerar dados de config", err);
  process.exit(1);
});
