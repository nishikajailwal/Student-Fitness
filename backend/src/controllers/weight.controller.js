const weightService = require("../services/weight.service");

exports.addWeight = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { weight } = req.body;

    if (!weight || weight <= 0) {
      return res.status(400).json({ error: "Valid weight required" });
    }

    const entry = await weightService.addWeight(userId, weight);

    res.status(201).json({
      message: "Weight logged",
      entry
    });

  } catch (err) {
    next(err);
  }
};

exports.getWeightHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const history = await weightService.getHistory(userId);

    res.json(history);

  } catch (err) {
    next(err);
  }
};

exports.deleteWeight = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await weightService.deleteWeight(userId, id);

    res.json({ message: "Weight entry deleted" });

  } catch (err) {
    next(err);
  }
};