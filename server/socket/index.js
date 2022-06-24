const { socketAuthMiddleware } = require("../utils/jwt");
const { WebSocketServer } = require("ws");
const newMessageEmitter = require("./messaging/new");

function recieveSocketData(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data + "";
  }
}

const wss = new WebSocketServer({
  noServer: true,
});

let wsClients = [];

wss.on("connection", function connection(ws, req) {
  ws["clientId"] = req.user._id;
  wsClients.push(ws);

  newMessageEmitter(wsClients);

  ws.on("close", function removeClient() {
    wsClients = wsClients.filter(
      (socket) => socket.clientId !== ws["clientId"]
    );
    return;
  });

  ws.send(JSON.stringify({ success: true, message: "Connected " }));
});

function upgradeToSocket(request, socket, head) {
  if (request.url.length <= 3 && !request.url) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }
  try {
    const token = request.url.split("token/")[1];
    const authenticatedUser = socketAuthMiddleware(token);
    if (!authenticatedUser) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    if (
      wsClients.find((socket) => socket["clientId"] === authenticatedUser._id)
    ) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    request.user = authenticatedUser;
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  } catch (error) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }
}

async function socketController(ws, data) {}

module.exports = { upgradeToSocket };
