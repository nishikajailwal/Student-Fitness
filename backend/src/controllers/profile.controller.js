const profileService = require("../services/profile.service");

exports.createOrUpdateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;

    const profile = await profileService.createOrUpdate(userId, profileData);

    res.json({
      message: "Profile saved successfully",
      profile
    });

  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await profileService.getByUserId(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);

  } catch (err) {
    next(err);
  }
};