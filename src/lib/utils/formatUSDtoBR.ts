export function formatUSDtoBR(value: number) {
  const USDollarToBrazilians = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "name",
  });

  return USDollarToBrazilians.format(value);
}
