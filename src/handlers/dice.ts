import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

export async function handleDice(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  const msg = await context.replyWithDice("🎲");
  return await context.reply(`Вам выпало число ${msg.dice.value}!`);
}

export async function handleDice2(ctx: Context): Promise<Message.TextMessage> {
  // prettier-ignore
  const [
    { dice: { value: d1 } },
    { dice: { value: d2 } },
  ] = await Promise.all([
    ctx.replyWithDice("🎲"),
    ctx.replyWithDice("🎲"),
  ]);

  const dubble = d1 === d2 ? "Дубль!" : "";
  const message = `Вам выпало ${d1} + ${d2} = ${d1 + d2}! ${dubble}`;
  return await ctx.reply(message);
}

export async function handleDarts(ctx: Context): Promise<Message.TextMessage> {
  const msg = await ctx.replyWithDice("🎯");
  const responses = [
    "Мимо!",
    "5 очков!",
    "15 очков!",
    "25 очков!",
    "50 очков!",
    "В яблочко!🍎 100 очков!",
  ] as const;
  const message = responses[msg.dice.value - 1]!;
  return await ctx.reply(message);
}

export async function handleCasino(ctx: Context): Promise<Message.TextMessage> {
  const msg = await ctx.replyWithDice("🎰");
  const message = msg.dice.value % 21 === 1 ? "Удача! :)" : "Не удача :(";
  return await ctx.reply(message);
}

export async function handleFootball(
  ctx: Context,
): Promise<Message.TextMessage> {
  const msg = await ctx.replyWithDice("⚽");
  const result = msg.dice.value;
  const responses = ["Выше ворот!", "Штанга!"] as const;
  const message = result > 2 ? "Гоооол!" : responses[result - 1]!;
  return await ctx.reply(message);
}

export async function handleBasketball(
  ctx: Context,
): Promise<Message.TextMessage> {
  const msg = await ctx.replyWithDice("🏀");
  const responses = [
    "Мимо!",
    "Почти!",
    "Не попал!",
    "Попал!",
    "Идеальное попадание!",
  ] as const;
  const message = responses[msg.dice.value - 1]!;
  return await ctx.reply(message);
}

export async function handleBowling(
  ctx: Context,
): Promise<Message.TextMessage> {
  const msg = await ctx.replyWithDice("🎳");
  const responses = [
    "0 из 6!",
    "1 из 6!",
    "3 из 6!",
    "4 из 6!",
    "5 из 6!",
    "Страйк!",
  ] as const;
  const message = responses[msg.dice.value - 1]!;
  return await ctx.reply(message);
}
