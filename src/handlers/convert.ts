import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

import { convertCurrency, formatCurrencyAmount } from "#lib/convert-currency";
import { escapeMarkdownV2 } from "#lib/escape-markdown";
import { wrap } from "#lib/wrap";

const DEFAULT_MESSAGE = `
*Валюты*

Доллар  —  ${wrap("/convert USD")}
Евро  —  ${wrap("/convert EUR")}
Фунты  —  ${wrap("/convert GBP")}
Гривны  —  ${wrap("/convert UAH")}
Юани  —  ${wrap("/convert CNY")}
Корейские воны  —  ${wrap("/convert KRW")}


*Криптовалюты*

Биткоин  —  ${wrap("/convert BTC USD")}
` as const;

export async function handleConvert(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  if (!context.match) {
    return context.reply(DEFAULT_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const args = context.match.split(/\s+/);

  if (args.length > 2) {
    return context.reply(DEFAULT_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const from = args[0]!;
  const to = args[1] ?? "RUB";

  const price = await convertCurrency(from, to);

  if (!price) {
    return context.reply(`Failed to convert price from ${from} to ${to}`);
  }

  return context.reply(
    `${wrap(formatCurrencyAmount(from, 1))} ${escapeMarkdownV2("=")} ${wrap(formatCurrencyAmount(to, price))}`,
    { parse_mode: "MarkdownV2" },
  );
}
