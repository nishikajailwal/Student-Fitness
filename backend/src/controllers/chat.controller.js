const chatService = require("../services/chat.service");

exports.sendMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const reply = await chatService.handleMessage(userId, message);

    res.json({
      userMessage: message,
      aiReply: reply
    });

  } catch (err) {
    next(err);
  }
};

exports.getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const history = await chatService.getHistory(userId);

    res.json(history);

  } catch (err) {
    next(err);
  }
};

exports.clearChat = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await chatService.clearChat(userId);

    res.json({ message: "Chat cleared" });

  } catch (err) {
    next(err);
  }
};