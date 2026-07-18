const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/company.controller");

router.get(
    "/profile",
    auth,
    getProfile
);

router.put(
    "/profile",
    auth,
    updateProfile
);

module.exports = router;