const ChannelUser = require("../models/Channel_user");
const Channel = require("../models/Channel");
const Message = require("../models/Message");
const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../error");

const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find({});
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ success: true, data: { channels } });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

const createChannel = async (req, res) => {
  const { _id: adminId } = req.user;
  const { channelName } = req.body;

  if (!channelName) {
    throw new CustomError("Enter valid values", StatusCodes.BAD_REQUEST);
  }

  try {
    const newChannel = new Channel({ adminId, name: channelName });
    await newChannel.save();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Channel successfully Created",
      data: { channel: newChannel },
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

const deleteChannel = async (req, res) => {
  const { _id: adminId } = req.user;
  const { channelId } = req.body;

  if (!channelId) {
    throw new CustomError("Enter valid values", StatusCodes.BAD_REQUEST);
  }

  const channel = await Channel.findOne({ _id: channelId, adminId });
  if (!channel) {
    throw new CustomError("Enter valid values", StatusCodes.BAD_REQUEST);
  }

  try {
    await Channel.deleteOne({ _id: channelId, adminId });
    await ChannelUser.deleteMany({ channelId });
    await Message.deleteMany({ channelId });

    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Channel successfully deleted",
      data: { channel },
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

module.exports = { deleteChannel, createChannel, getAllChannels };
