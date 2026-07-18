const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
    companyName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    approved: {
        type: Boolean,
        default: false
    },

    description: String,

    website: String,

    role: {
        type: String,
        default: "company"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Company", companySchema);