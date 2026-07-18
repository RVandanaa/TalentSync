const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    requiredSkills: [{
        type: String
    }],

    preferredSkills: [{
        type: String
    }],

    stipend: Number,

    location: {
        type: String,
        enum: ["Remote","Hybrid","On-Site"]
    },

    deadline: Date,

    maxApplicants: Number,

    currentApplicants: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["Draft","Active","Closed"],
        default: "Draft"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);