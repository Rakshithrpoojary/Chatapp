import React from "react";
import { useUserContext } from "../Context/Context";
import "../Styles/HeaderMessage.css";
import { IoMdArrowRoundBack } from "react-icons/io";
function HeaderMessage() {
  const { messages, clearStorage } = useUserContext();
  console.log("HS", messages);
  return (
    <div className="message-header-container">
      <button onClick={clearStorage}>
        <IoMdArrowRoundBack />
      </button>
      <p>{messages.recivername}</p>
    </div>
  );
}

export default HeaderMessage;
