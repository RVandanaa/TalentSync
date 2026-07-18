const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    getProfile,
    updateProfile,
    getProfileCompleteness
} = require("../controllers/student.controller");

// Get Profile
router.get(
    "/profile",
    auth,
    getProfile
);

// Update Profile
router.put(
    "/profile",
    auth,
    updateProfile
);

// Profile Completeness
router.get(
    "/completeness",
    auth,
    getProfileCompleteness
);

module.exports = router;