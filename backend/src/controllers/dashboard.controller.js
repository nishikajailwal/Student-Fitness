const dashboardService = require("../services/dashboard.service");

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await dashboardService.getDashboard(userId);

    res.json(data);

  } catch (err) {
    next(err);
  }
};