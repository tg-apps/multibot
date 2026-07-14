import type { CommandContext, Context } from "grammy";
import type { Message, MessageOrigin, User } from "grammy/types";

import { wrap } from "#lib/wrap";

function getChatIdFromMessageOrigin(
  messageOrigin: MessageOrigin,
): number | null {
  if (messageOrigin.type === "chat") return messageOrigin.sender_chat.id;
  if (messageOrigin.type === "user") return messageOrigin.sender_user.id;
  if (messageOrigin.type === "channel") return messageOrigin.chat.id;
  return null;
}

export async function handleId(
  context: CommandContext<Context> & { from: User },
): Promise<Message.TextMessage> {
  const userId = context.from.id;
  const chatId = context.chatId;

  const replyMessage = context.msg.reply_to_message;

  const noReplyMessage = `
Ваш ID
${wrap(userId)}
ID чата
${wrap(chatId)}`;

  if (!replyMessage) {
    return await context.reply(noReplyMessage, { parse_mode: "MarkdownV2" });
  }

  const replyMessageUserId = replyMessage.from?.id;

  if (!replyMessageUserId) {
    return await context.reply(noReplyMessage, { parse_mode: "MarkdownV2" });
  }

  const replyMessageForwardOrigin = replyMessage.forward_origin;

  const noForwardMessage = `
${noReplyMessage}
ID пользователя на чье сообщение вы ответили
${wrap(replyMessageUserId)}`;

  if (!replyMessageForwardOrigin) {
    return await context.reply(noForwardMessage, { parse_mode: "MarkdownV2" });
  }

  const replyMessageForwardedFromChatId = getChatIdFromMessageOrigin(
    replyMessageForwardOrigin,
  );

  if (!replyMessageForwardedFromChatId) {
    return await context.reply(noForwardMessage, { parse_mode: "MarkdownV2" });
  }

  const message = `
${noForwardMessage}
ID чата из которого оно было переслано
${wrap(replyMessageForwardedFromChatId)}
`;

  return await context.reply(message, { parse_mode: "MarkdownV2" });
}
