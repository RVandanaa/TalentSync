const Notification = require("../models/Notification");

const createNotification = async (
    user,
    role,
    title,
    message
) => {

    await Notification.create({
        user,
        role,
        title,
        message
    });

};

module.exports = createNotification;