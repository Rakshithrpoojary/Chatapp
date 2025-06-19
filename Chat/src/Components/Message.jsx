import React, { useEffect, useState } from "react";
import TypeMessage from "./TypeMessage";
import "../Styles/Message.css";
import { useUserContext } from "../Context/Context";
import { useSocketContext } from "../Context/SocketContext";
import HeaderMessage from "./HeaderMessage";
import ScrollToBottom from "react-scroll-to-bottom";

function Message({ userOffline, numbermsg }) {
  const { loginData, messages, setMessages, optimisticMessages } =
    useUserContext();
  const { socketdata } = useSocketContext();
  const [Typing, setTyping] = useState(false);

  useEffect(() => {
    if (!socketdata) return;

    socketdata?.on("Message", (data) => {
      if (messages?.reciverid === data?.senderid) {
        setMessages((prev) => ({
          ...prev,
          allMessages: [...prev.allMessages, data],
        }));
      } else {
        userOffline(data?.senderid);
      }
    });
    const handleTyping = () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    };
    socketdata.on("Typing", (sender) => {
      if (sender === messages?.reciverid) {
        handleTyping();
      }
    });

    return () => {
      socketdata.off("Typing", handleTyping);
      socketdata?.off("Message");
    };
  }, [socketdata, messages, numbermsg]);

  return (
    <div
      style={{ display: messages.reciverid ? "flex" : "none" }}
      className="message-section"
    >
      <HeaderMessage />
      <ScrollToBottom initialScrollBehavior="smooth" className="messages">
        {optimisticMessages?.allMessages.map((msg, index) => (
          <>
            {msg.loading ? (
              <p className="sending">Sending...</p>
            ) : (
              <p
                key={msg._id}
                className={
                  msg.senderid === loginData.senderUser._id
                    ? "senderclass"
                    : "reciverclass"
                }
              >
                {msg.message}
              </p>
            )}
          </>
        ))}
        <p id="typing">{Typing && "𝘛𝘺𝘱𝘪𝘯𝘨..."}</p>
      </ScrollToBottom>
      <TypeMessage />
    </div>
  );
}

export default Message;
