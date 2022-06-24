import classes from "../css/message.module.css";

const userIcon = (name) => {
  if (name.split(" ").length > 1) {
    name = name.split(" ");
    return name[0].slice(0, 1) + name[1].slice(0, 1);
  } else {
    return name.slice(0, 2);
  }
};

const Message = ({ message }) => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.icon}>{userIcon(message.userId.username)}</span>
      <div className={classes.message}>
        <p className={classes.username}>{message.userId.username}</p>
        <p className={classes.msg}>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
