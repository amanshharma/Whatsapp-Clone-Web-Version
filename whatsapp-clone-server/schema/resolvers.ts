import { GraphQLDateTime } from "graphql-iso-date";
import { chats, messages } from "../data";

const resolvers = {
  Date: GraphQLDateTime,
  Chat: {
    lastMessage(chat: any) {
      const lastMessage = chat.messages[chat.messages.length - 1];
      return messages.find(m => m.id === lastMessage);
    },
    messages(chat: any) {
      return messages.filter(m => chat.messages.includes(m.id));
    }
  },
  Query: {
    chats() {
      return chats;
    },
    chat(root: any, { chatId }: any) {
      return chats.find(c => c.id === chatId);
    }
  }
};
export default resolvers;
