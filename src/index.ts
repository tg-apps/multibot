import { run } from "@grammyjs/runner";
import { Bot, GrammyError } from "grammy";

const TOKEN = process.env["TOKEN"];
if (!TOKEN) throw new Error("Missing TOKEN env variable");

const bot = new Bot(TOKEN);

const m = bot.on("message");

m.command("start", (ctx) => {
  return ctx.reply("/help");
});

void bot.api.setMyCommands([
  { command: "start", description: "Start" },
  { command: "help", description: "Help" },
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
