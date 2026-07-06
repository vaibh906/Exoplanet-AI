import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import "./styles/App.css";
import "./components/Navbar.css";
import "./components/Hero.css";
import "./pages/Dashboard.css";
import "./components/Prediction.css";
import "./components/Footer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);