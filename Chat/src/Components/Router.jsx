import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Signin from "./Signin";
import MessageContainer from "./MessageContainer";
function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/messagebox" element={<MessageContainer />} />
      </Routes>
    </div>
  );
}

export default Router;
