const express = require("express");
const { addMessage, getAllMessages } = require("../controller/message");
const router = express.Router();

// router.get("/:username/getALL");
router.post("/new", addMessage);
router.get("/channel/:channelId/messages", getAllMessages);

module.exports = router;
