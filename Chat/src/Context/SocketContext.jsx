import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUserContext } from "./Context";
const socketContext = createContext();

function SocketedContext({ children }) {
  const { loginData } = useUserContext();
  const [socketdata, setSocket] = useState();
  const [onlineUser, setOnlineUser] = useState();
  useEffect(() => {
    if (loginData?.senderUser._id) {
      const socket = io("http://localhost:3000", {
        query: {
          id: loginData.senderUser._id,
        },
      });
      setSocket(socket);
      socket.on("Onlineuser", (users) => {
        console.log("USER", users);
        setOnlineUser(users);
      });
      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socketdata) {
        socketdata.close();
        setSocket(null);
      }
    }
  }, [loginData?.senderUser._id]);

  return (
    <div>
      <socketContext.Provider value={{ onlineUser, socketdata }}>
        {children}
      </socketContext.Provider>
    </div>
  );
}
function useSocketContext() {
  return useContext(socketContext);
}

export { SocketedContext, useSocketContext };
