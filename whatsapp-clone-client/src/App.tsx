import React from "react";
import ChatListScreen from "./components/ChatListScreen";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ChatListScreen></ChatListScreen>
      </header>
    </div>
  );
};

export default App;