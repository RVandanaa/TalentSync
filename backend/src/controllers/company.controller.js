const Company = require("../models/Company");
const Job = require("../models/Job");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// =============================
// Get Company Profile
// =============================
const getProfile = asyncHandler(async (req, res) => {

    const company = await Company.findById(req.user.id)
        .select("-password");

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Company profile fetched successfully",
            company
        )
    );
});

// =============================
// Update Company Profile
// =============================
const updateProfile = asyncHandler(async (req, res) => {

    const allowedUpdates = [
        "companyName",
        "description",
        "website"
    ];

    const updates = {};

    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    const company = await Company.findByIdAndUpdate(
        req.user.id,
        updates,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Company profile updated successfully",
            company
        )
    );
});

module.exports = {
    getProfile,
    updateProfile
};