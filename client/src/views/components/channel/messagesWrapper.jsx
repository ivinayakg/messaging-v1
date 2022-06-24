import { useState } from "react";
import { useGetAllMessages } from "../../../application/features/messages";
import { getFromStorage } from "../../../services/localstorage";
import classes from "../css/messagesWrapper.module.css";
import Message from "./message";

const MessagesWrapper = ({ channelId }) => {
  const [queryHistory, setQueryHistory] = useState({ before: null, limit: 20 });
  const { data: messagesData, isSuccess } = useGetAllMessages(
    getFromStorage("token"),
    {
      channelId,
      limit: queryHistory.limit,
      before: queryHistory.before,
    }
  );
  const messages = isSuccess && messagesData.data.data.allMessages;

  return (
    <div className={classes.main}>
      {isSuccess &&
        messages.length > 0 &&
        messages.map((msg) => <Message message={msg} key={msg._id} />)}
    </div>
  );
};

export default MessagesWrapper;
