import type { CommandContext, Context } from "grammy";
import type { Message } from "grammy/types";

const HELP_MESSAGE = `
*Помощь*

/convert  —  Курсы валют

/calculate  —  Калькулятор

/time  —  Время

/day  —  День недели
/year  —  Год
/date  —  Дата

/dice  —  🎲
/dice2  —  🎲🎲
/darts  —  🎯
/casino  —  🎰
/football  —  ⚽️
/basketball  —  🏀
/bowling  —  🎳

/id  —  узнать свой ID
`;

export function handleHelp(
  context: CommandContext<Context>,
): Promise<Message.TextMessage> {
  return context.reply(HELP_MESSAGE, { parse_mode: "MarkdownV2" });
}
