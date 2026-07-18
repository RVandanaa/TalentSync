const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
} = require("../controllers/job.controller");


// Public
router.get("/", getAllJobs);

// Company
router.get(
    "/company/my-jobs",
    auth,
    authorize("company"),
    getMyJobs
);

// Public

router.get("/:id", getJobById);

// Company Only
router.post("/", auth, authorize("company"), createJob);

router.put(
    "/:id",
    auth,
    authorize("company"),
    updateJob
);

router.delete(
    "/:id",
    auth,
    authorize("company"),
    deleteJob
);

router.get(
    "/company/my-jobs",
    auth,
    authorize("company"),
    getMyJobs
);

module.exports = router;