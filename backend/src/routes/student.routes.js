const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    getProfile,
    updateProfile,
    getProfileCompleteness,
    getDashboard
} = require("../controllers/student.controller");

// Get Profile
router.get("/profile", auth, getProfile);

// Update Profile
router.put("/profile", auth, updateProfile);

// Profile Completeness
router.get("/completeness", auth, getProfileCompleteness);

// Dashboard
router.get("/dashboard", auth, getDashboard);

module.exports = router;