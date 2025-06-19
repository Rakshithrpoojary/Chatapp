import React, { useState } from "react";
import User from "./User";
import Message from "./Message";
import "../Styles/MessageContainer.css";
import toast from "react-hot-toast";
import { useUserContext } from "../Context/Context";

function MessageContainer() {
  const [numbermsg, setnumbermsg] = useState({});
  const { loginData } = useUserContext();

  const userOffline = (id) => {
    let key = id;
    console.log("KEY", key);
    console.log("loginData", loginData);

    let user = loginData.ReciverUser.find((user, index) => user._id == key);
    console.log("USER", user);
    if (key in numbermsg) {
      setnumbermsg((prev) => {
        toast((t) => (
          <div className="toast">
            <p id="chat-box">𝓒𝓱𝓪𝓽 𝓑𝓸𝔁</p>
            <p id="name">
              {user.username} {prev[key] + 1}
            </p>
          </div>
        ));
        return { ...prev, [key]: prev[key] + 1 };
      });
    } else {
      setnumbermsg((prev) => {
        toast((t) => (
          <div className="toast">
            <p id="chat-box">𝓒𝓱𝓪𝓽 𝓑𝓸𝔁</p>
            <p id="name">{user.username} 1</p>
          </div>
        ));
        return { ...prev, [key]: 1 };
      });
    }
  };

  console.log("num", numbermsg);
  return (
    <div className="message-container">
      <User numbermsg={numbermsg} />
      <Message userOffline={userOffline} numbermsg={numbermsg} />
    </div>
  );
}

export default MessageContainer;
