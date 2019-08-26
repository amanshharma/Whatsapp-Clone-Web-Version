import React, { Fragment, useState, useEffect, useMemo } from "react";
import { List, ListItem } from "@material-ui/core";
import moment from "moment";
import axios from "axios";

import styles from "./ChatList.module.scss";

const ChatList: React.FC = () => {
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

  useMemo(() => {
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

  return (
    <div className="container">
      {!!chats && (
        <List>
          {chats.map(item => {
            return (
              <ListItem key={item.id}>
                <img src={item.picture} alt={item.name} />
                <p className={styles.leftMargin}>{item.name}</p>
                {item.lastMessage && (
                  <Fragment>
                    <p className={styles.leftMargin}>
                      {item.lastMessage.content}
                    </p>
                    <p className={styles.leftMargin}>
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
