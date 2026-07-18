const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    status: {
        type: String,
        enum: [
            "Submitted",
            "Under Review",
            "Shortlisted",
            "Rejected",
            "Offer Extended",
            "Withdrawn"
        ],
        default: "Submitted"
    },

    matchScore: Number

},
{
    timestamps: true
});

// Prevent duplicate applications
applicationSchema.index(
    { student: 1, job: 1 },
    { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);