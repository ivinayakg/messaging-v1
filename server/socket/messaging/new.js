const MessageEventWatcher = require("../../models/Message").watch();
const ChannelUser = require("../../models/Channel_user");
const User = require("../../models/User");

function sendSocketData(data) {
  return JSON.stringify(data);
}

module.exports = async function newMessageEmitter(sockets) {
  MessageEventWatcher.on("change", async function modelChange(data) {
    if (data.operationType === "insert") {
      let messageDoc = data.fullDocument;
      let allUsersOfThisChannel = (
        await ChannelUser.find({ channelId: messageDoc.channelId.toString() })
      ).map((connection) => connection.userId.toString());
      let messageUser = await User.findOne({ _id: messageDoc.userId });
      messageDoc = { ...messageDoc, userId: messageUser };
      sockets.forEach((socket) => {
        let clientId = socket["clientId"];
        let userIndex = allUsersOfThisChannel.indexOf(clientId);
        if (userIndex !== -1) {
          socket.send(sendSocketData(messageDoc));
        }
      });
    }
  });
};
