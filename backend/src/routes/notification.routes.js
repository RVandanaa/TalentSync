const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    getNotifications,
    markAsRead
} = require("../controllers/notification.controller");

router.get("/", auth, getNotifications);

router.patch("/:id/read", auth, markAsRead);

module.exports = router;