const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    jobType: {
        type: String,
        enum: ["Internship", "Full-Time", "Part-Time"],
        default: "Internship"
    },

    salary: {
        type: Number,
        default: 0
    },

    requiredSkills: [{
        type: String,
        trim: true
    }],

    minimumCGPA: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },

    branch: [{
        type: String
    }],

    applicationDeadline: {
        type: Date,
        required: true
    },

    maxApplicants: {
        type: Number,
        default: 100
    },

    applicantsCount: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);