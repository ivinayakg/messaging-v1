const ChannelUser = require("../models/Channel_user");
const Channel = require("../models/Channel");
const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../error");

const joinChannel = async (req, res) => {
  const { _id: userId } = req.user;
  const { channelId } = req.body;

  //if already joined the channel
  const alreadyExists = await ChannelUser.findOne({ userId, channelId });
  if (alreadyExists) {
    throw new CustomError(
      "You Have Already Joined the channel",
      StatusCodes.BAD_GATEWAY
    );
  }

  try {
    const newJoin = new ChannelUser({ channelId, userId });
    await newJoin.save();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Channel Successfully Joined",
      data: { newJoin },
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

const exitChannel = async (req, res) => {
  const { _id: userId } = req.user;
  const { channelId } = req.body;

  //if already joined the channel
  const connectionExists = await ChannelUser.findOne({ userId, channelId });
  if (!connectionExists) {
    throw new CustomError("No connection found", StatusCodes.BAD_GATEWAY);
  }

  try {
    const newJoin = new ChannelUser({ channelId, userId });
    await newJoin.save();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Channel Successfully Joined",
      data: { newJoin },
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

const getMyJoinedChannels = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const myChannels = await ChannelUser.find({ userId }).populate("channelId");
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ sucess: true, message: "All My Channels", data: { myChannels } });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: error.message });
  }
};

module.exports = { getMyJoinedChannels, exitChannel, joinChannel };
