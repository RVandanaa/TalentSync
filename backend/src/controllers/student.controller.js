const Student = require("../models/Student");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// ======================
// Get Logged-in Student Profile
// ======================
const getProfile = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.user.id).select("-password -otp");

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched successfully",
            student
        )
    );
});

// ======================
// Update Student Profile
// ======================
const updateProfile = asyncHandler(async (req, res) => {

    const updates = req.body;

    const student = await Student.findByIdAndUpdate(
        req.user.id,
        updates,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -otp");

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile updated successfully",
            student
        )
    );
});

// ======================
// Calculate Profile Completeness
// ======================
const getProfileCompleteness = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.user.id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    const fields = [
        student.name,
        student.email,
        student.college,
        student.branch,
        student.graduationYear,
        student.cgpa,
        student.skills?.length ? true : false,
        student.github,
        student.linkedin,
        student.bio,
        student.resumeUrl
    ];

    const filledFields = fields.filter(Boolean).length;
    const percentage = Math.round((filledFields / fields.length) * 100);

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile completeness calculated",
            {
                profileCompleteness: percentage
            }
        )
    );
});

module.exports = {
    getProfile,
    updateProfile,
    getProfileCompleteness
};