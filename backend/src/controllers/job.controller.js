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


// ====================================
// Update Job
// ====================================

const updateJob = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // Only owner company can update
    if (job.company.toString() !== req.user.id) {
        throw new ApiError(403, "You are not allowed to update this job");
    }

    const allowedUpdates = [
        "title",
        "description",
        "location",
        "jobType",
        "salary",
        "requiredSkills",
        "minimumCGPA",
        "branch",
        "applicationDeadline",
        "maxApplicants",
        "status"
    ];

    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
            job[field] = req.body[field];
        }
    });

    await job.save();

    res.status(200).json(
        new ApiResponse(
            200,
            "Job updated successfully",
            job
        )
    );

});

// ====================================
// Delete Job
// ====================================

const deleteJob = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (job.company.toString() !== req.user.id) {
        throw new ApiError(403, "You are not allowed to delete this job");
    }

    await job.deleteOne();

    res.status(200).json(
        new ApiResponse(
            200,
            "Job deleted successfully"
        )
    );

});

// ====================================
// Get Logged-in Company's Jobs
// ====================================

const getMyJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find({
        company: req.user.id
    }).populate("company", "companyName");

    res.status(200).json(
        new ApiResponse(
            200,
            "Company jobs fetched successfully",
            jobs
        )
    );

});

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
};