import React from "react";
import ReactDOM from "react-dom/client";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

import App from "./App";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider theme={defaultTheme}>
      <App />
    </Provider>
  </React.StrictMode>
);
