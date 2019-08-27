import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import ChatListScreen from "./components/ChatListScreen";
import ChatRoomScreen from "./components/ChatRoomScreen";

import "./App.scss";
import { Divider } from "@material-ui/core";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/chats" component={ChatListScreen} />
      <Route exact path="/chats/:chatId" component={ChatRoomScreen} />
    </Switch>
    <Route exact path="/" render={redirectToChats} />
  </BrowserRouter>
);

const redirectToChats = () => <Redirect to="/chats"></Redirect>;

export default App;
