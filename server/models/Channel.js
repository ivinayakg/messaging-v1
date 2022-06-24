const { Schema, model, Types } = require("mongoose");

const ChannelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please a name for your channel"],
  },
  adminId: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "An admin is required to create a group"],
  },
});

ChannelSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("channel name must be unique"));
  } else {
    next(error);
  }
});

module.exports = model("Channel", ChannelSchema);
