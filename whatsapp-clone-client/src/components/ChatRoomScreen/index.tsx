import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ChatRoomScreen from "./ChatRoomScreen";

export default ({ match }: RouteComponentProps<{ chatId: string }>) => (
  <ChatRoomScreen chatId={match.params.chatId}></ChatRoomScreen>
);
