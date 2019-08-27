import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";
import { List, ListItem } from "@material-ui/core";
import moment from "moment";
import { History } from "history";
import axios from "axios";

import styles from "./ChatList.module.scss";

interface ChatsListProps {
  history: History;
}

const ChatList: React.FC<ChatsListProps> = ({ history }) => {
  const [chats, setChats] = useState(undefined);

  const getChatsQuery = `
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`;

  useEffect(() => {
    const fetchChats = async () => {
      const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: getChatsQuery })
      });
      const {
        data: { chats }
      } = await body.json();
      setChats(chats);
    };
    fetchChats();
  }, []);

  const navToChat = useCallback(
    chatId => {
      console.log("hey");
      history.push(`chats/${chatId}`);
    },
    [history]
  );

  return (
    <div className="container">
      {!!chats && (
        <List>
          {chats.map(item => {
            return (
              <ListItem
                key={item.id}
                button
                onClick={navToChat.bind(null, item.id)}
              >
                <img src={item.picture} data-testid="picture" alt={item.name} />
                <p className={styles.leftMargin} data-testid="name">
                  {item.name}
                </p>
                {item.lastMessage && (
                  <Fragment>
                    <p className={styles.leftMargin} data-testid="content">
                      {item.lastMessage.content}
                    </p>
                    <p className={styles.leftMargin} data-testid="date">
                      {moment(item.lastMessage.createdAt).format("HH:mm")}
                    </p>
                  </Fragment>
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default ChatList;
