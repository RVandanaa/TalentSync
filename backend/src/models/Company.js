const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
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

    approved: {
      type: Boolean,
      default: false,
    },

    description: String,

    website: String,

    role: {
      type: String,
      default: "company",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password
companySchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Company", companySchema);