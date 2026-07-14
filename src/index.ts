import { run } from "@grammyjs/runner";
import { Bot, GrammyError } from "grammy";

import { handleCalculate } from "./handlers/calculate";
import { handleConvert } from "./handlers/convert";
import { handleDate, handleDay, handleYear } from "./handlers/datetime";
import {
  handleBasketball,
  handleBowling,
  handleCasino,
  handleDarts,
  handleDice,
  handleDice2,
  handleFootball,
} from "./handlers/dice";
import { handleHelp } from "./handlers/help";
import { handleId } from "./handlers/id";
import { handleTime } from "./handlers/time";

const TOKEN = process.env["TOKEN"];
if (!TOKEN) throw new Error("Missing TOKEN env variable");

const bot = new Bot(TOKEN);

const m = bot.on("message");

m.command(["start", "help"], handleHelp);

m.command("convert", handleConvert);
m.command("calculate", handleCalculate);
m.command("time", handleTime);

m.command("day", handleDay);
m.command("year", handleYear);
m.command("date", handleDate);

m.command("dice", handleDice);
m.command("dice2", handleDice2);
m.command("darts", handleDarts);
m.command("casino", handleCasino);
m.command("football", handleFootball);
m.command("basketball", handleBasketball);
m.command("bowling", handleBowling);

m.command("id", handleId);

void bot.api.setMyCommands([
  { command: "start", description: "Start" },
  { command: "help", description: "Help" },

  { command: "convert", description: "Convert Currencies" },
  { command: "calculate", description: "Evaluate mathematical expression" },
  { command: "time", description: "Time" },

  { command: "day", description: "Day of week" },
  { command: "year", description: "Year" },
  { command: "date", description: "Date and Time" },

  { command: "dice", description: "🎲" },
  { command: "dice2", description: "🎲🎲" },
  { command: "darts", description: "🎯" },
  { command: "casino", description: "🎰" },
  { command: "football", description: "⚽️" },
  { command: "basketball", description: "🏀" },
  { command: "bowling", description: "🎳" },

  { command: "id", description: "Get my ID" },
]);

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
  } else {
    console.error("Unknown error:", error);
  }
});

const runner = run(bot);
const stopRunner = () => runner.isRunning() && runner.stop();

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
