import {
  createContext,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from "react";
const userContext = createContext();
import { useNavigate } from "react-router-dom";
import PostFetch from "../CustomHooks/PostFetch";
import useGetdata from "../CustomHooks/useGetdata";

function Context({ children }) {
  const navigate = useNavigate();
  const { FetchData, loading, userData } = PostFetch();
  const [loginData, setLoginData] = useState();
  const [messages, setMessages] = useState({
    senderid: "",
    reciverid: "",
    recivername: "",
    allMessages: [],
  });
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newmsg) => ({
      senderid: newmsg.senderid,
      reciverid: newmsg.reciverid,
      recivername: newmsg.recivername,
      allMessages: [...state.allMessages, { ...newmsg, loading: true }],
    })
  );
  const reciveridfromstorage = localStorage.getItem("Reciverid");
  const { getLloading, getData } = useGetdata(
    "http://localhost:3000/user/v1/getUser",
    (data) => setLoginData(data)
  );
  useEffect(() => {
    if (loginData?.senderUser._id && reciveridfromstorage) {
      getAllmsg(loginData?.senderUser._id, reciveridfromstorage);
    }
  }, [loginData]);

  const SubmitHandler = async (formData) => {
    try {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      console.log("dddd", data);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      };
      await FetchData("http://localhost:3000/user/v1/login", options, (data) =>
        setLoginData(data)
      );
      navigate("/messagebox");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const getAllmsg = async (senderid, reciveridtoapi) => {
    try {
      console.log(senderid, reciveridtoapi);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      await FetchData(
        `http://localhost:3000/user/v1/getallmessage/${senderid}/${reciveridtoapi}`,
        options,
        (data) => setMessages(data)
      );
      localStorage.setItem("Reciverid", reciveridtoapi);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const SendMessage = async (formData) => {
    const body = {
      senderid: loginData.senderUser._id,
      reciverid: messages.reciverid,
      message: formData.get("msg"),
    };
    addOptimisticMessage(body);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };
    await FetchData(
      "http://localhost:3000/user/v1/sendmsg",
      options,
      (data) => {
        setMessages(data);
      }
    );
  };

  const Logout = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      await FetchData(
        "http://localhost:3000/user/v1/logout",
        options,
        (data) => {
          setLoginData(data);
        }
      );
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };
  const clearStorage = () => {
    localStorage.removeItem("Reciverid");
    setMessages({ reciverid: "", allMessages: [] });
  };
  return (
    <userContext.Provider
      value={{
        SubmitHandler,
        loginData,
        getLloading,
        getAllmsg,
        messages,
        optimisticMessages,
        SendMessage,
        setMessages,
        Logout,
        clearStorage,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(userContext);
};
export default Context;
