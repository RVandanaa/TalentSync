const Student = require("../models/Student");
const Company = require("../models/Company");
const RefreshToken = require("../models/RefreshToken");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/token.service");

// ===============================
// Register Student
// ===============================
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingStudent = await Student.findOne({ email });

  if (existingStudent) {
    throw new ApiError(409, "Student already exists");
  }

  const student = await Student.create({
    name,
    email,
    password,
  });

  res.status(201).json(
    new ApiResponse(201, "Student Registered Successfully", {
      id: student._id,
      name: student.name,
      email: student.email,
    })
  );
});

// ===============================
// Register Company
// ===============================
const registerCompany = asyncHandler(async (req, res) => {
  const { companyName, email, password } = req.body;

  const existingCompany = await Company.findOne({ email });

  if (existingCompany) {
    throw new ApiError(409, "Company already exists");
  }

  const company = await Company.create({
    companyName,
    email,
    password,
  });

  res.status(201).json(
    new ApiResponse(201, "Company Registered Successfully", {
      id: company._id,
      companyName: company.companyName,
      email: company.email,
    })
  );
});

// ===============================
// Login
// ===============================
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await Student.findOne({ email });
  let role = "student";

  if (!user) {
    user = await Company.findOne({ email });
    role = "company";
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const payload = {
    id: user._id,
    role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await RefreshToken.create({
    userId: user._id,
    role,
    token: refreshToken,
  });

  res.status(200).json(
    new ApiResponse(200, "Login Successful", {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role,
      },
    })
  );
});

module.exports = {
  registerStudent,
  registerCompany,
  login,
};