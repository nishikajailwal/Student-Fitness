const express = require("express");
const router = express.Router();
const weightController = require("../controllers/weight.controller");
const authMiddleware = require("../middleware/auth.middleware");

/*
  WEIGHT ROUTES
  Protected routes
*/

router.post("/", authMiddleware, weightController.addWeight);
router.get("/", authMiddleware, weightController.getWeightHistory);
router.delete("/:id", authMiddleware, weightController.deleteWeight);

module.exports = router;