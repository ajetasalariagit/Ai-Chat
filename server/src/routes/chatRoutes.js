const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");

router.post("/suggest", chatController.suggestReply);

module.exports = router;