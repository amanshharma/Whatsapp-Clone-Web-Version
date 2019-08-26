import React, { Fragment, useState, useEffect } from "react";
import { List, ListItem } from "@material-ui/core";
import moment from "moment";
import axios from "axios";

import styles from "./ChatList.module.scss";

const ChatList: React.FC = () => {
  const [chats, setChats] = useState(undefined);

  useEffect(() => {
    axios
      .get("http://localhost:4000/_chats")
      .then(chats => setChats(chats.data));
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
