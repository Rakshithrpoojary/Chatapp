import React, { useRef, useState } from "react";
import "../Styles/TypeMessage.css";
import { useUserContext } from "../Context/Context";
import { useSocketContext } from "../Context/SocketContext";

function TypeMessage() {
  const { SendMessage, messages } = useUserContext();
  const { socketdata } = useSocketContext();
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    socketdata.emit("Typing", messages?.senderid, messages.reciverid);
    setValue(e.target.value);
  };

  return (
    <form action={SendMessage} className="type-container">
      <textarea
        name="msg"
        onChange={onChangeHandler}
        placeholder="Type Message..."
      />
      <button type="submit" disabled={value === ""}>
        Send
      </button>
    </form>
  );
}

export default TypeMessage;
