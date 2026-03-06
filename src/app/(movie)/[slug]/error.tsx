"use client";

import { useEffect } from "react";

import ErrorPage from "@/components/error/ErrorPage";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RouteError({ error, reset }: Readonly<ErrorProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorPage model="errorPage" as="section" onRetry={reset} />;
}
