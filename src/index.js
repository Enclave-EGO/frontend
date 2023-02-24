import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Screens from "./screens/index.jsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Screens>
        <App />
      </Screens>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
