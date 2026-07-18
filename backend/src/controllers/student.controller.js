const Student = require("../models/Student");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Application = require("../models/Application");
const Job = require("../models/Job");

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

    const allowedUpdates = [
        "college",
        "branch",
        "graduationYear",
        "cgpa",
        "skills",
        "github",
        "linkedin",
        "bio",
        "resumeUrl"
    ];

    const updates = {};

    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

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

const getDashboard = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.user.id).select("-password -otp");

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    // Profile Completeness
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

    const completedFields = fields.filter(Boolean).length;
    const profileCompletion = Math.round(
        (completedFields / fields.length) * 100
    );

    // These will become dynamic later
    const totalApplications = await Application.countDocuments({
        student: student._id,
    });

    const shortlisted = await Application.countDocuments({
        student: student._id,
        status: "Shortlisted",
    });

    const offers = await Application.countDocuments({
        student: student._id,
        status: "Offer Extended",
    });

    res.status(200).json(
        new ApiResponse(200, "Dashboard fetched successfully", {
            student,
            profileCompletion,
            totalApplications,
            shortlisted,
            offers,
        })
    );
});

module.exports = {
    getProfile,
    updateProfile,
    getProfileCompleteness,
    getDashboard
};