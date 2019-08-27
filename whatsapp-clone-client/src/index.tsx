import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.scss";
import App from "./App";
import client from "./client";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#2c6157" },
    secondary: { main: "#6fd056" }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
