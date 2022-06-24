const { Schema, Types, model } = require("mongoose");

const ChannelUserSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: [true, "a user is added for a message to be created"],
    ref: "User",
  },
  channelId: {
    type: Types.ObjectId,
    required: [true, "a channel is added for a message to be created"],
    ref: "Channel",
  },
});

module.exports = model("ChannelUser", ChannelUserSchema);
