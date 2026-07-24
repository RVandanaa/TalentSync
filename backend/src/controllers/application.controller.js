const Application = require("../models/Application");
const Job = require("../models/Job");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const Student = require("../models/Student");

const calculateMatchScore =require("../utils/matching");
const createNotification = require("../utils/createNotification");

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


    const student = await Student.findById(req.user.id);

const matchScore =
calculateMatchScore(student, job);

const application = await Application.create({

    student: req.user.id,

    company: job.company,

    job: job._id,

    matchScore

});

    job.applicantsCount += 1;

    if (job.applicantsCount >= job.maxApplicants) {
        job.status = "Closed";
    }

    await job.save();

    await createNotification(
    job.company,
    "company",
    "New Job Application",
    `${student.name} applied for ${job.title}`
);

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
    .sort({
    matchScore:-1
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

    const { status } = req.body;

    const allowedStatuses = [
        "Under Review",
        "Shortlisted",
        "Rejected",
        "Offer Extended"
    ];

    if (!allowedStatuses.includes(status)) {
        throw new ApiError(400, "Invalid application status");
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

   await application.populate("job");

if (application.job.company.toString() !== req.user.id) {
    throw new ApiError(403, "Access denied");
}

    application.status = status;

    await application.save();

    await createNotification(
    application.student,
    "student",
    "Application Status Updated",
    `Your application for ${application.job.title} is now ${status}`
);

    res.status(200).json(
        new ApiResponse(
            200,
            "Application status updated successfully",
            application
        )
    );

});

// ====================================
// Company - Get All Applications
// ====================================

const getCompanyApplications = asyncHandler(async (req, res) => {

    const jobs = await Job.find({ company: req.user.id }).select("_id");

    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
        job: { $in: jobIds }
    })
    .populate("student", "-password")
    .populate("job", "title location jobType status");

    res.status(200).json(
        new ApiResponse(
            200,
            "Company applications fetched successfully",
            applications
        )
    );

});

module.exports = {
    applyJob,
    getMyApplications,
    withdrawApplication,
    getApplicants,
    updateApplicationStatus,
    getCompanyApplications
};