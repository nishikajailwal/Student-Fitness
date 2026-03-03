const planService = require("../services/plan.service");

exports.generatePlan = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type } = req.body;

    if (!type || !["workout", "diet"].includes(type)) {
      return res.status(400).json({ error: "Plan type must be workout or diet" });
    }

    const plan = await planService.generatePlan(userId, type);

    res.status(201).json({
      message: "Plan generated",
      plan
    });

  } catch (err) {
    next(err);
  }
};

exports.getPlans = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const plans = await planService.getPlans(userId);

    res.json(plans);

  } catch (err) {
    next(err);
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await planService.deletePlan(userId, id);

    res.json({ message: "Plan deleted" });

  } catch (err) {
    next(err);
  }
};