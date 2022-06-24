const express = require("express");
const { getMyJoinedChannels } = require("../controller/channelUser-controller");
const router = express.Router();

// router.get('/:username/getmessages')
// router.post('/post')
router.get("/channel/all", getMyJoinedChannels);

module.exports = router;
