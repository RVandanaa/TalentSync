const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.middleware");
const authRoutes =require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const companyRoutes = require("./routes/company.routes");


const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

// Body Parser
app.use(express.json());

app.use(
"/api/auth",
authRoutes
);
app.use("/api/student", studentRoutes);

app.use("/api/company", companyRoutes);


// Cookie Parser
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "InternLoom Backend Running"
    });
});



app.use(errorHandler);

module.exports = app;