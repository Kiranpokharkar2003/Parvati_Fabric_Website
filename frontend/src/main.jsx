import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { theme } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HelmetProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
