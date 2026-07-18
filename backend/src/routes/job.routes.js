const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {

    createJob,
    getAllJobs,
    getJobById

} = require("../controllers/job.controller");

// Company Only
router.post(
    "/",
    auth,
    authorize("company"),
    createJob
);

// Public
router.get(
    "/",
    getAllJobs
);

// Public
router.get(
    "/:id",
    getJobById
);

module.exports = router;