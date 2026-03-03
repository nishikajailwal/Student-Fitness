const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/auth.middleware");

/*
  AI CHAT ROUTES
  Protected routes
*/

router.post("/", authMiddleware, chatController.sendMessage);
router.get("/", authMiddleware, chatController.getChatHistory);
router.delete("/", authMiddleware, chatController.clearChat);

module.exports = router;