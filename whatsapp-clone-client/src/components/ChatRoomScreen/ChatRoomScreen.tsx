import React, { useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useMemo, useState } from "react";
import { Input, Button } from "@material-ui/core";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import client from "../../client";

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

  //todo use useCallback here
  const sendMessage = () => {
    console.log("chat -- ", chat);
    const newMessage = {
      id: "21",
      content: message,
      createdAt: new Date(),
      __typename: "Chat"
    };
    //setChat({ ...chat, messages: chat.messages.concat(msg) });
    client.writeQuery({
      query: getChatQuery,
      variables: { chatId },
      data: {
        chat: {
          ...chat,
          messages: chat.messages.concat(newMessage)
        }
      }
    });
  };

  const { data } = useQuery<any>(getChatQuery, { variables: { chatId } });
  console.log("*****", data);

  if (!chat) {
    if (data.chat) {
      console.log("data -- ", data);
      setChat(data.chat);
    }
  }

  useEffect(() => {}, [data]);

  // /useCallback(() => sendMessage(data.chat), [data.chat]);

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
