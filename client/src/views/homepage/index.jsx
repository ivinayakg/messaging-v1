import { Route, Routes } from "react-router-dom";
import { getFromStorage } from "../../services/localstorage";
import Channel from "../components/channel";
import Sidebar from "./sidebar";
import classes from "./index.module.css";
import createSocket from "../../services/createSocket";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

const Homepage = () => {
  const token = getFromStorage("token");
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket = createSocket(token);

    socket.onmessage = (event) => {
      let messageDoc = JSON.parse(event.data);
      queryClient.setQueriesData(
        `single-channel-${messageDoc.channelId}`,
        (data) => {
          return {
            ...data,
            data: {
              ...data.data,
              data: {
                allMessages: [messageDoc, ...data.data.data.allMessages],
              },
            },
          };
        }
      );
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className={classes.container}>
      <Sidebar />
      <Routes>
        <Route path="/channel">
          <Route index element={<BlankPage />} />
          <Route path="/channel/:channelId" element={<Channel />} />
        </Route>
      </Routes>
    </div>
  );
};

const BlankPage = () => {
  return <div className="blankPage"></div>;
};

export default Homepage;
