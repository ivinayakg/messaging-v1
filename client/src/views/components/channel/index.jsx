import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  useGetAllUserChannels,
  useJoinSingleChannel,
} from "../../../application/features/channels";
import { getFromStorage } from "../../../services/localstorage";
import classes from "../css/channel.module.css";
import MessageInput from "./messageInput";
import MessagesWrapper from "./messagesWrapper";

const Channel = () => {
  const {
    data: allUserChannels,
    isSuccess,
    isError,
    error,
  } = useGetAllUserChannels(getFromStorage("token"));
  const { mutateAsync: joinChannelAPI } = useJoinSingleChannel();
  const { channelId } = useParams();
  const queryClient = useQueryClient();

  const allUsersJoinedChannels =
    isSuccess &&
    allUserChannels.data.data.myChannels.map(
      (channel) => channel.channelId._id
    );
  const isUserJoinedThisChannel =
    isSuccess && allUsersJoinedChannels.indexOf(channelId) !== -1;

  const joinChannelHandler = async () => {
    if (isUserJoinedThisChannel) return;

    const res = await joinChannelAPI(
      {
        token: getFromStorage("token"),
        data: { channelId },
      },
      {
        onError: (error) => {
          console.log(error);
        },
      }
    );

    await queryClient.invalidateQueries("all-user-channels", {
      refetchActive: true,
      refetchInactive: true,
    });
  };

  return (
    <>
      {!isUserJoinedThisChannel && (
        <div className={classes.join}>
          <h1>Join This Channel</h1>
          <button onClick={joinChannelHandler}>Join</button>
        </div>
      )}
      {isUserJoinedThisChannel && (
        <div className={classes.main}>
          <MessagesWrapper channelId={channelId} />
          <MessageInput channelId={channelId} />
        </div>
      )}
    </>
  );
};

export default Channel;
