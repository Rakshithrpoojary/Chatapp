import React from "react";
import { useUserContext } from "../Context/Context";
import "../Styles/HeaderChat.css";
function HeaderChat() {
  const { Logout } = useUserContext();

  return (
    <div className="Hederchat-container">
      <p>𝓒𝓱𝓪𝓽 𝓑𝓸𝔁</p>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}

export default HeaderChat;
