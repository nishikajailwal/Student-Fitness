const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller");
const authMiddleware = require("../middleware/auth.middleware");

/*
  AI PLAN ROUTES
  Protected routes
*/

router.post("/generate", authMiddleware, planController.generatePlan);
router.get("/", authMiddleware, planController.getPlans);
router.delete("/:id", authMiddleware, planController.deletePlan);

module.exports = router;