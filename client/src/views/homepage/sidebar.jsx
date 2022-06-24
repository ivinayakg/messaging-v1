import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  useCreateChannel,
  useGetAllChannels,
} from "../../application/features/channels";
import { getFromStorage } from "../../services/localstorage";
import ChannelModal from "../components/createChannelModal";
import SidebarContainer from "../components/sideBar";

const Sidebar = () => {
  const [modalState, setModalState] = useState(false);
  const { data: channelData, isSuccess } = useGetAllChannels(
    getFromStorage("token")
  );
  const { mutateAsync: createChannelAPI } = useCreateChannel();
  const userChannels = isSuccess && channelData.data.data.channels;

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const openChannel = (id) => {
    navigate(`/channel/${id}`);
  };

  const createChannelToggle = () => {
    setModalState(true);
  };

  const createChannelHandler = async (data) => {
    const res = await createChannelAPI(
      {
        data,
        token: getFromStorage("token"),
      },
      {
        onError: (error) => {
          console.log(error);
        },
      }
    );

    await queryClient.invalidateQueries("all-channels", {
      refetchActive: true,
      refetchInactive: true,
    });
    setModalState(false);
  };

  return (
    <>
      {modalState && (
        <ChannelModal
          submitHandler={createChannelHandler}
          closeModal={() => setModalState(false)}
        />
      )}
      {isSuccess && (
        <SidebarContainer
          openChannel={openChannel}
          channels={userChannels}
          createChannel={createChannelToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
