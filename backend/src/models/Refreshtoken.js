const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
{

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    role: {
        type: String,
        enum: ["student","company"]
    },

    token: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);