import { useState } from "react";
import toast from "react-hot-toast";
function PostFetch() {
  const [loading, Setloading] = useState(false);
  const [userData, setUserData] = useState();
  const FetchData = async (url, options, callback) => {
    try {
      Setloading(true);
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        if (data.statuscode >= 200 && data.statuscode < 300) {
          setUserData(data.data);
          callback(data.data);
          data.statuscode !== 202 && toast.success(data.message);
        } else {
          throw new Error(data.message);
        }
      } else {
        throw new Error("Network Error");
      }
    } catch (error) {
      // toast.error(error.message);
      throw error;
    } finally {
      Setloading(false);
    }
  };

  return { FetchData, loading, userData };
}

export default PostFetch;
