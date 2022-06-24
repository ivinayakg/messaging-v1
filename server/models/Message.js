const { Schema, model, Types } = require("mongoose");

const MessageSchema = new Schema(
  {
    message: {
      type: String,
    },
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
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);
