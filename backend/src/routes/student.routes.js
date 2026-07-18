const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    getProfile,
    updateProfile,
    getProfileCompleteness,
    getDashboard
} = require("../controllers/student.controller");

// Student Profile
router.get(
    "/profile",
    auth,
    authorize("student"),
    getProfile
);

// Update Profile
router.put(
    "/profile",
    auth,
    authorize("student"),
    updateProfile
);

// Profile Completeness
router.get(
    "/completeness",
    auth,
    authorize("student"),
    getProfileCompleteness
);

// Dashboard
router.get(
    "/dashboard",
    auth,
    authorize("student"),
    getDashboard
);

module.exports = router;