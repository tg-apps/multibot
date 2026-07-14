import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

import { escapeMarkdownV2 } from "#lib/escape-markdown";
import {
  findMatchingLocales,
  findMatchingTimeZones,
  getTimeForTimeZone,
  getTimeZonesForLocale,
} from "#lib/time";
import { wrap } from "#lib/wrap";

const DEFAULT_MESSAGE = `
*Время*

Москва  —  ${wrap("/time Moscow")}
Лондон  —  ${wrap("/time London")}
Франция  —  ${wrap("/time France")}
` as const;

function handleTimeWithLocales(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  const locales = findMatchingLocales(context.match);

  if (locales.length === 0) {
    return context.reply(
      `Could not find a matching timezone for ${context.match}`,
    );
  }

  if (locales.length === 1) {
    const locale = locales[0]!;

    const timezones = getTimeZonesForLocale(locale);

    if (timezones.length === 0) {
      return context.reply(
        `Could not find a matching timezone for ${context.match}`,
      );
    }

    return handleTimeWithTimeZones(context, timezones);
  }

  return context.reply(
    `Could not find a matching timezone for ${context.match}`,
  );
}

function handleTimeWithTimeZones(
  context: CommandContext<Context>,
  timezones: string[],
): Promise<Message.TextMessage> {
  const timezone = timezones[0]!;

  if (timezones.length === 1) {
    const time = getTimeForTimeZone(timezone, Date.now());

    if (!time) {
      return context.reply(
        `Found ${timezone} timezone for ${context.match}, but could not calculate time`,
      );
    }

    if (context.match === timezone) {
      return context.reply(`Time in ${timezone} timezone is ${time}`);
    }

    return context.reply(
      `Time in ${context.match} (${timezone} timezone) is ${time}`,
    );
  }

  const message = `${escapeMarkdownV2(`Found ${timezones.length} timezones for ${context.match}:`)}

${escapeMarkdownV2(timezones.join("\n"))}

${escapeMarkdownV2("Try specifiying a single city or timezone, for example:")}

${wrap(`/time ${timezone}`)}
`;

  return context.reply(message, { parse_mode: "MarkdownV2" });
}

export function handleTime(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  if (!context.match) {
    return context.reply(DEFAULT_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const timezones = findMatchingTimeZones(context.match);

  if (timezones.length === 0) {
    return handleTimeWithLocales(context);
  }

  return handleTimeWithTimeZones(context, timezones);
}
