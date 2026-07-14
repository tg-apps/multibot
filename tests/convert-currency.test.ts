import { describe, it, expect } from "bun:test";

import { formatCurrencyAmount } from "#lib/convert-currency";

describe("formatCurrencyAmount", () => {
  it("should format normal currencies", () => {
    expect(formatCurrencyAmount("USD", 3.2)).toBe("3.2$");
    expect(formatCurrencyAmount("usd", 3.2)).toBe("3.2$");
    expect(formatCurrencyAmount("RUB", 3.2)).toBe("3.2₽");
    expect(formatCurrencyAmount("rub", 3.2)).toBe("3.2₽");
    expect(formatCurrencyAmount("EUR", 3.2)).toBe("3.2€");
    expect(formatCurrencyAmount("eur", 3.2)).toBe("3.2€");
  });

  it("should format cryptocurrencies", () => {
    expect(formatCurrencyAmount("BTC", 3.2)).toBe("3.2₿");
    expect(formatCurrencyAmount("btc", 3.2)).toBe("3.2₿");
  });

  it("should format unknown cryptocurrencies", () => {
    expect(formatCurrencyAmount("ETH", 3.2)).toBe("3.2 ETH");
    expect(formatCurrencyAmount("eth", 3.2)).toBe("3.2 ETH");
    expect(formatCurrencyAmount("SOL", 3.2)).toBe("3.2 SOL");
    expect(formatCurrencyAmount("sol", 3.2)).toBe("3.2 SOL");
  });
});
