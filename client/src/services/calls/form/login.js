import axios from "../../api";

export const LoginCall = async (data) => {
  const res = await axios.post("/auth/login", data);
  if (!res.data.success) {
    throw new Error("Somthing Went Wrong");
  }
  return res.data.data;
};
