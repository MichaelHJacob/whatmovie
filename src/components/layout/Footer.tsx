import Link from "next/link";

import TMDBLogo from "@/assets/logos/Credits/blue_short-tmdb.svg";
import WmLogo from "@/assets/logos/logoWithText.svg";
import Container from "@/components/layout/Container";
import BreakHr from "@/components/ui/BreakHr";
import HTitle from "@/components/ui/HTitle";

export default function Footer() {
  return (
    <Container as="footer" className="bg-base">
      <HTitle>
        <Link href="/" className="text-neutral-accent">
          <WmLogo
            aria-label="WhatMovie"
            className="inline-block h-11 fill-current"
          />
          <span className="sr-only">WhatMovie</span>
        </Link>
      </HTitle>
      <section>
        <HTitle as="h3" className="text-md text-neutral-accent">
          Sobre
        </HTitle>
        <div className="blockContainer-p">
          <p className="font-sans text-sm font-normal leading-snug tracking-normal text-neutral-subtle">
            Este produto utiliza a API do TMDB, mas não é endossado ou
            certificado pelo TMDB.
            <br />
            Dados de disponibilidade de streaming fornecidos pelo{" "}
            <a
              href="https://www.justwatch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-neutral-subtle underline hover:text-link-neutral-subtle-hover"
            >
              JustWatch
            </a>
            .<br />
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block h-auto rounded-lg bg-transparent p-2"
            >
              <TMDBLogo className="block h-4" />
            </a>
          </p>
        </div>
      </section>
      <BreakHr />
      <div className="blockContainer-p">
        <div className="all-gap flex min-h-11 items-center justify-start py-2 xs:py-4 lg:py-6">
          <small className="font-sans text-xs font-semibold leading-snug tracking-normal text-neutral-subtle">
            Copyright &copy; 2025 What Movie.
          </small>
          <p className="font-sans text-xs font-semibold leading-snug tracking-normal text-neutral-subtle">
            Desenvolvido por{" "}
            <a
              href="https://michaelhjacob.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline text-link-neutral-subtle underline hover:text-link-neutral-subtle-hover"
            >
              Michael H. Jacob
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
