const express = require("express");
const { authMiddleware } = require("../utils/jwt");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use(authMiddleware);
router.use("/channel", require("./channels"));
router.use("/user", require("./user"));
router.use("/messages", require("./message"));

module.exports = router;
