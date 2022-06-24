import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getFromStorage } from "../../services/localstorage";
import classes from "./css/createchannelmodal.module.css";

const ChannelModal = ({ submitHandler, closeModal }) => {
  const modalRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      channelName: e.target.children[2].value,
      adminId: getFromStorage("user", true).userId,
    };
    submitHandler(data);
  };

  const outSideClick = (event) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("click", outSideClick);
    return () => {
      window.removeEventListener("click", outSideClick);
    };
  }, []);

  return createPortal(
    <div className={classes.wrapper} ref={modalRef}>
      <form className={classes.form} onSubmit={submitForm}>
        <h1>Create Channel</h1>
        <label htmlFor="channelname">Channel Name</label>
        <input type="text" id="channelName" name="channelName" />
        <button type="submit">Create A Channel</button>
      </form>
    </div>,
    document.body
  );
};
export default ChannelModal;
