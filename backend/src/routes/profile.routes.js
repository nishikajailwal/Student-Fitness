const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");

/*
  PROFILE ROUTES
  Protected routes
*/

router.post("/", authMiddleware, profileController.createOrUpdateProfile);
router.get("/", authMiddleware, profileController.getProfile);

module.exports = router;