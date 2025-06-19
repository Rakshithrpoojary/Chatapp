import "../Styles/User.css";
import HeaderChat from "./HeaderChat";
import { useUserContext } from "../Context/Context";
import { useSocketContext } from "../Context/SocketContext";
import { motion } from "framer-motion";

function User({ numbermsg }) {
  const { loginData, getLloading, getAllmsg, messages } = useUserContext();
  const { onlineUser } = useSocketContext();
  console.log("ONLINE", onlineUser);
  if (!getLloading) {
    return <h1>Loading</h1>;
  }
  const getAllmessages = (sender, reciver) => {
    getAllmsg(sender, reciver);
    delete numbermsg[reciver];
  };
  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
      style={{ display: messages.reciverid ? "none" : "flex" }}
      className="user-container"
    >
      <HeaderChat />
      <div className="users">
        <button
          onClick={() =>
            getAllmessages(loginData?.senderUser._id, loginData?.senderUser._id)
          }
          key={loginData?.senderUser._id}
        >
          <p id="btn-one">{loginData?.senderUser.username}</p>
        </button>
        {loginData?.ReciverUser?.map((user, index) => (
          <button
            onClick={() =>
              getAllmessages(loginData?.senderUser._id, user?.users?._id)
            }
            key={user._id}
          >
            <div id="btn-parent-one">
              <p id="username">{user?.users?.username}</p>
              {numbermsg[user._id] && <p>{numbermsg[user._id]}</p>}
              {onlineUser?.includes(user._id) && <p id="online">Online</p>}
            </div>
            <div id="btn-parent-two">
              <p>{user?.messages[user?.messages?.length - 1]?.message}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default User;
