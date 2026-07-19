const Application = require("../models/Application");
const Job = require("../models/Job");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// ====================================
// Student Apply for Job
// ====================================

const applyJob = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (job.status !== "Open") {
        throw new ApiError(400, "Job is closed");
    }

    const alreadyApplied = await Application.findOne({
        student: req.user.id,
        job: jobId
    });

    if (alreadyApplied) {
        throw new ApiError(400, "You have already applied for this job");
    }

    const application = await Application.create({
        student: req.user.id,
        company: job.company,
        job: job._id
    });

    job.applicantsCount += 1;

    if (job.applicantsCount >= job.maxApplicants) {
        job.status = "Closed";
    }

    await job.save();

    res.status(201).json(
        new ApiResponse(
            201,
            "Application submitted successfully",
            application
        )
    );

});

// ====================================
// Student My Applications
// ====================================

const getMyApplications = asyncHandler(async (req, res) => {

    const applications = await Application.find({
        student: req.user.id
    })
    .populate("job")
    .populate("company", "companyName");

    res.status(200).json(
        new ApiResponse(
            200,
            "Applications fetched successfully",
            applications
        )
    );

});

// ====================================
// Withdraw Application
// ====================================

const withdrawApplication = asyncHandler(async (req, res) => {

    const application = await Application.findById(req.params.id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    if (application.student.toString() !== req.user.id) {
        throw new ApiError(403, "Access denied");
    }

    application.status = "Withdrawn";

    await application.save();

    res.status(200).json(
        new ApiResponse(
            200,
            "Application withdrawn successfully",
            application
        )
    );

});

// ====================================
// Company View Applicants
// ====================================

const getApplicants = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (job.company.toString() !== req.user.id) {
        throw new ApiError(403, "Access denied");
    }

    const applicants = await Application.find({
        job: job._id
    })
    .populate("student", "-password")
    .populate("job");

    res.status(200).json(
        new ApiResponse(
            200,
            "Applicants fetched successfully",
            applicants
        )
    );

});

// ====================================
// Company Update Status
// ====================================

const updateApplicationStatus = asyncHandler(async (req, res) => {

    const application = await Application.findById(req.params.id)
        .populate("job");

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    if (application.job.company.toString() !== req.user.id) {
        throw new ApiError(403, "Access denied");
    }

    application.status = req.body.status;

    await application.save();

    res.status(200).json(
        new ApiResponse(
            200,
            "Application status updated",
            application
        )
    );

});

module.exports = {
    applyJob,
    getMyApplications,
    withdrawApplication,
    getApplicants,
    updateApplicationStatus
};