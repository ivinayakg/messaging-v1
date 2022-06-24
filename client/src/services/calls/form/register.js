import axios from "../../api";

export const RegisterCall = async (data) => {
  const res = await axios.post("/auth/register", data);
  if (!res.data.success) {
    throw new Error("Somthing Went Wrong");
  }
  return res.data.data;
};
