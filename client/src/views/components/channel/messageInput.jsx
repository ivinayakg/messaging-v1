import { useState } from "react";
import { useSendAMessage } from "../../../application/features/messages";
import { getFromStorage } from "../../../services/localstorage";
import classes from "../css/messageInput.module.css";

const MessageInput = ({ channelId }) => {
  const [formData, setFormData] = useState({ channelId });
  const { mutateAsync: sendMessageAPI } = useSendAMessage();

  const handleInput = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formData.message === "") return;
    await sendMessageAPI(
      { token: getFromStorage("token"), data: formData },
      {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (data) => {
          setFormData((prev) => ({ ...prev, message: "" }));
        },
      }
    );
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        name="message"
        onChange={handleInput}
        value={formData.message ?? ""}
      />
      <button
        disabled={formData.message === "" || !formData.message}
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
