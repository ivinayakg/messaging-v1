const { Schema, model, Types } = require("mongoose");

const ChannelSchema = new Schema({
  name: {
    type: String,
    unique: [true, "Channel name already taken"],
    required: [true, "Please a name for your channel"],
  },
  admin: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "An admin is required to create a group"],
  },
});

module.exports = model("Channel", ChannelSchema);
