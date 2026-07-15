import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";
import { calculate } from "picocalc";

import { escapeMarkdownV2 } from "#lib/escape-markdown";
import { wrap } from "#lib/wrap";

export async function handleCalculate(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  const message = await context.reply("Calculating...");

  try {
    const result = calculate(context.match);
    await context.api.editMessageText(
      context.chatId,
      message.message_id,
      `${wrap(context.match)} ${escapeMarkdownV2("=")} ${wrap(result)}`,
      { parse_mode: "MarkdownV2" },
    );
  } catch {
    await context.api.editMessageText(
      context.chatId,
      message.message_id,
      "Failed to evaluate the expression.",
    );
  }

  return message;
}
