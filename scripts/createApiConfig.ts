import dotenv from "dotenv";
import fs from "node:fs";
import { inspect } from "node:util";
import path from "path";
import prettier from "prettier";

import { API_ENDPOINTS } from "../src/config/config";

dotenv.config({ path: [".env.local"] });

const OUTPUT_PATH = path.join(__dirname, "../src/data/tmdbConfig.ts");

async function getApiConfig() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(API_ENDPOINTS.configuration, options);

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }

  return res.json();
}

async function run() {
  const config = await getApiConfig();

  const fileContent = `
  export const tmdbConfig = ${inspect(config, {
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
