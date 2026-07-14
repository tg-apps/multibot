const EXCHANGE_RATE_API_URL = "https://api.exchangerate.fun/latest";

const CRYPTO_SYMBOLS: Record<string, string> = {
  BTC: "₿",
};

function getCurrencySymbol(currency: string): string {
  const cryptoSymbol = CRYPTO_SYMBOLS[currency];
  if (cryptoSymbol) return cryptoSymbol;

  const symbolPart = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  })
    .formatToParts(0)
    .find((part) => part.type === "currency");

  return symbolPart ? symbolPart.value : currency;
}

function formatCurrencyAmount(currency: string, amount: number) {
  const symbol = getCurrencySymbol(currency.toUpperCase());
  if (symbol.length > 1) return `${amount} ${symbol}`;
  return `${amount}${symbol}`;
}

interface ExchangeRateApiResponse {
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

async function convertCurrency(
  from: string,
  to: string,
): Promise<number | null> {
  const url = new URL(EXCHANGE_RATE_API_URL);
  url.searchParams.set("base", from);
  const response = await fetch(url);
  const data: ExchangeRateApiResponse = await response.json();
  return data.rates[to.toUpperCase()] ?? null;
}

export { convertCurrency, formatCurrencyAmount };
