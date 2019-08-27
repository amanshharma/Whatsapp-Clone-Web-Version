import React from "react";
import ChatList from "./ChatList";
import NavBar from "./NavBar";

export default ({ history }) => (
  <div className="wrapper">
    <NavBar></NavBar>
    <ChatList history={history}></ChatList>
  </div>
);
