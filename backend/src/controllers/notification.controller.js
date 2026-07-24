const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// Get Notifications
const getNotifications = asyncHandler(async (req, res) => {

    const notifications = await Notification.find({
        user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(
            200,
            "Notifications fetched successfully",
            notifications
        )
    );
});

// Mark Notification Read
const markAsRead = asyncHandler(async (req, res) => {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    if (notification.user.toString() !== req.user.id) {
        throw new ApiError(403, "Access denied");
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json(
        new ApiResponse(
            200,
            "Notification marked as read",
            notification
        )
    );
});

module.exports = {
    getNotifications,
    markAsRead
};