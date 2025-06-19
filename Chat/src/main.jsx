import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Components/Router";
import { Toaster } from "react-hot-toast";
import Context from "./Context/Context";
import { SocketedContext } from "./Context/SocketContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Context>
      <SocketedContext>
        <Router />
      </SocketedContext>
    </Context>
    <Toaster position="top-center" reverseOrder={false} />
  </BrowserRouter>
  // </StrictMode>
);
