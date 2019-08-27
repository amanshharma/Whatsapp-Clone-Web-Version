import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Input, Button } from "@material-ui/core";

import ChatRoomScreen from "./ChatRoomScreen";

export default ({
  match,
  history
}: RouteComponentProps<{ chatId: string }>) => {
  return (
    <Fragment>
      <Button onClick={() => history.replace(`/chats`)}>BACK</Button>
      <br />
      <br />
      <br />
      <ChatRoomScreen chatId={match.params.chatId}></ChatRoomScreen>
    </Fragment>
  );
};
