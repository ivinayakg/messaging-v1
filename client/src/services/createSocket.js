const baseURL = import.meta.env.VITE_BASEURLSOCKET;

const createSocket = (token) => new WebSocket(baseURL + token);
export default createSocket;
