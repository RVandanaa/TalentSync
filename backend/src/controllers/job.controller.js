const Job = require("../models/Job");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// ====================================
// Create Job
// ====================================

const createJob = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        location,
        jobType,
        salary,
        requiredSkills,
        minimumCGPA,
        branch,
        applicationDeadline,
        maxApplicants
    } = req.body;

    const job = await Job.create({

        company: req.user.id,

        title,
        description,
        location,
        jobType,
        salary,
        requiredSkills,
        minimumCGPA,
        branch,
        applicationDeadline,
        maxApplicants

    });

    res.status(201).json(

        new ApiResponse(

            201,
            "Job created successfully",
            job

        )

    );

});

// ====================================
// Get All Jobs
// ====================================

const getAllJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find({ status: "Open" })
        .populate("company", "companyName website");

    res.status(200).json(

        new ApiResponse(
            200,
            "Jobs fetched successfully",
            jobs
        )

    );

});

// ====================================
// Get Job By ID
// ====================================

const getJobById = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.id)
        .populate("company", "companyName website");

    if (!job) {

        throw new ApiError(404, "Job not found");

    }

    res.status(200).json(

        new ApiResponse(
            200,
            "Job fetched successfully",
            job
        )

    );

});

module.exports = {

    createJob,
    getAllJobs,
    getJobById

};