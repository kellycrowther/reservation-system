import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { StartApp } from "./components/StartApp/StartApp";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <StartApp>
          <App />
        </StartApp>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
