import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import store from "./store";
import ErrorBoundary from "./ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ErrorBoundary>
);
