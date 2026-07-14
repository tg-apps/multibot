import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

export function handleYear(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  const year = new Date().getFullYear();
  return context.reply(`Сейчас ${year} год`);
}

const WEEK = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
] as const;

type DayOfWeek = (typeof WEEK)[number];

function getDayOfWeek(now: Date): DayOfWeek {
  return WEEK[now.getDay()]!;
}

export function handleDay(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  const now = new Date();
  const dayOfWeek = getDayOfWeek(now);
  return context.reply(dayOfWeek);
}

export function handleDate(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  const now = new Date();

  const dayOfWeek = getDayOfWeek(now);

  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(now);

  const year = now.getFullYear();

  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const message = `${dayOfWeek}, ${date} ${year}, ${time}`;

  return context.reply(message);
}
