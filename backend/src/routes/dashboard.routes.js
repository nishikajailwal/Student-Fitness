const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

/*
  DASHBOARD ROUTES
  Protected route
*/

router.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = router;