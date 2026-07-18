const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/company.controller");

router.get(
    "/profile",
    auth,
    authorize("company"),
    getProfile
);

router.put(
    "/profile",
    auth,
    authorize("company"),
    updateProfile
);

module.exports = router;