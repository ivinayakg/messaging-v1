import { PlusIcon } from "@heroicons/react/outline";
import classes from "./css/sidebar.module.css";

const channelIcon = (name) => {
  if (name.split(" ").length > 1) {
    name = name.split(" ");
    return name[0].slice(0, 1) + name[1].slice(0, 1);
  } else {
    return name.slice(0, 2);
  }
};

const SidebarContainer = ({ createChannel, channels, openChannel }) => {
  return (
    <aside className={classes.main}>
      {channels.map((channel) => {
        return (
          <span
            key={channel._id}
            onClick={() => openChannel(channel._id)}
            className={classes.icon}
          >
            {channelIcon(channel.name)}
          </span>
        );
      })}
      <span onClick={createChannel} className={classes.icon}>
        <PlusIcon />
      </span>
    </aside>
  );
};

export default SidebarContainer;
