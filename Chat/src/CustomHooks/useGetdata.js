import { useEffect, useState } from "react";

function useGetdata(url, callback) {
  const [getData, setGetData] = useState();
  const [getLloading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchdata() {
      // setLoading(true);
      try {
        const response = await fetch(url, {
          credentials: "include",
          signal,
        });
        const data = await response.json();
        if (response.ok) {
          if (data.statuscode === 200) {
            console.log("DATA.DATA", data.data);
            callback(data.data);
            setGetData(data.data);
          } else {
            throw new Error(data.message);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(true);
      }
    }

    fetchdata();
    return () => {
      controller.abort();
    };
  }, [url]);
  return { getLloading, getData };
}

export default useGetdata;
