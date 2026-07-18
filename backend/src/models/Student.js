const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    verified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String
    },

    college: String,

    branch: String,

    graduationYear: Number,

    cgpa: {
        type: Number,
        min: 0,
        max: 10
    },

    skills: [{
        type: String,
        trim: true
    }],

    github: String,

    linkedin: String,

    bio: String,

    resumeUrl: String,

    role: {
        type: String,
        default: "student"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);