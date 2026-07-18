const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    college: String,

    branch: String,

    graduationYear: Number,

    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    github: String,

    linkedin: String,

    bio: String,

    resumeUrl: String,

    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed password
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);