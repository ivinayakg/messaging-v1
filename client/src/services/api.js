import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

export default axios.create({ baseURL });
