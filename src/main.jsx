import React from "react";
import App from "./App";
import "./index.css";
import { UIProvider } from "@yamada-ui/react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UIProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </UIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
