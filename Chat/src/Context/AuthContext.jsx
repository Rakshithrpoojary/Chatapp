import React from "react";
import { createContext } from "react";
const authcontext = createContext();
function AuthContext({ children }) {
  const { FetchData, loading, userData } = PostFetch();

  const Register = async (body) => {
    await FetchData("", data);
  };
  return (
    <div>
      <authcontext.Provider value={{}}>{children}</authcontext.Provider>
    </div>
  );
}

export default AuthContext;
