const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    applyJob,
    getMyApplications,
    withdrawApplication,
    getApplicants,
    updateApplicationStatus,
    getCompanyApplications
} = require("../controllers/application.controller");

// Student
router.post(
    "/:jobId",
    auth,
    authorize("student"),
    applyJob
);

router.get(
    "/my",
    auth,
    authorize("student"),
    getMyApplications
);

router.delete(
    "/:id",
    auth,
    authorize("student"),
    withdrawApplication
);

// Company
router.get(
    "/job/:jobId",
    auth,
    authorize("company"),
    getApplicants
);

router.patch(
    "/:id/status",
    auth,
    authorize("company"),
    updateApplicationStatus
);

router.get(
    "/company",
    auth,
    authorize("company"),
    getCompanyApplications
);

module.exports = router;