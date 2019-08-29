import React from "react";
import gql from "graphql-tag";
import { useMemo, useState } from "react";
import { Input, Button } from "@material-ui/core";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;
interface ChatRoomScreenParams {
  chatId: string;
}
interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}
interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}
type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({ chatId }) => {
  const [chat, setChat] = useState<OptionalChatQueryResult>(null);
  const [message, setMessage] = useState("");

  const onChange = ({ target }) => {
    console.log(target.value);
    setMessage(target.value);
  };

  const sendMessage = () => {
    console.log("chat -- ", chat);
    const msg = { id: "21", content: message, createdAt: new Date() };
    setChat({ ...chat, messages: chat.messages.concat(msg) });
  };

  // useMemo(async () => {
  //   const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       query: getChatQuery,
  //       variables: { chatId }
  //     })
  //   });
  //   const {
  //     data: { chat }
  //   } = await body.json();
  //   setChat(chat);
  // }, [chatId]);
  const { data } = useQuery<any>(getChatQuery, { variables: { chatId } });

  if (!chat) return null;

  return (
    <div>
      <img src={chat.picture} alt="Profile" />
      <div>{chat.name}</div>
      <ul>
        {chat.messages.map(message => (
          <li key={message.id}>
            <div>{message.content}</div>
            <div>{message.createdAt.toDateString}</div>
          </li>
        ))}
      </ul>
      <Input
        placeholder="Enter your message"
        onChange={onChange}
        value={message}
      ></Input>
      <Button size="medium" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};
export default ChatRoomScreen;
