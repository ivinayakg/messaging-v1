const express = require("express");
const {
  getAllChannels,
  createChannel,
} = require("../controller/channel-controller");
const { joinChannel } = require("../controller/channelUser-controller");
const router = express.Router();

router.get("/all", getAllChannels);
// router.get("/:channelId");
router.post("/create", createChannel);
router.post("/join", joinChannel);

module.exports = router;
