import React, { Fragment } from "react";
import { List, ListItem } from "@material-ui/core";
import moment from "moment";

import { chats } from "../../database";
import styles from "./ChatList.module.scss";

const ChatList: React.FC = () => (
  <div className="container">
    <List>
      {chats.map(item => {
        return (
          <ListItem key={item.id}>
            <img src={item.picture} alt={item.name} />
            <p className={styles.leftMargin}>{item.name}</p>
            {item.lastMessage && (
              <Fragment>
                <p className={styles.leftMargin}>{item.lastMessage.content}</p>
                <p className={styles.leftMargin}>
                  {moment(item.lastMessage.createdAt).format("HH:mm")}
                </p>
              </Fragment>
            )}
          </ListItem>
        );
      })}
    </List>
  </div>
);

export default ChatList;
