const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const { json } = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

const app = express();

//Cors Configuration - Start
app.use(cors());
//Cors Configuration - End

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// HTTP request logger
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Hppy");
});

//Daily Survey Schema
const { DailySurvey } = require("./models/dailySurveyModel");

//POST /Daily
/* This is a post request to the server. */
app.post("/dailySurvey", (req, res) => {
  let dailySurvey = new DailySurvey(req.body);

  dailySurvey.save((err) => {
    if (err) {
      console.log(err.code);
      err.code === 11000
        ? res.status(400).json({
            message: "Survey Already Exists",
          })
        : res.status(400).send(err);
      //   res.status(400).json({
      //     error: "Survey Already Exists",
      //   });
      // res.status(400).json(err);
    } else {
      res.status(201).json({
        message: "New Survey Saved",
        Survey: dailySurvey,
      });
    }
  });
});

//get daily survey data and displaying in front by hyewon
app.get("/dailySurvey", (req, res) => {
  DailySurvey.find({}).exec((error, result) => {
    if (error) {
      res.send(500).json(error);
    } else {
      res.json(result);
    }
  });
});

//Weekly Survey Schema
const { MonthlySurvey } = require("./models/MonthlySurveyModel");

//POST Weekly Survey

app.post("/monthlySurveys", (req, res) => {
  let monthlySurvey = new MonthlySurvey(req.body);

  monthlySurvey.save((err) => {
    if (err) {
      console.log(err.code);
      err.code === 11000
        ? res.status(400).json({
            message: "Monthly Survey Already Exists",
          })
        : res.status(400).send(err);
    } else {
      res.status(201).json({
        message: "New Monthly Survey Saved",
        Survey: monthlySurvey,
      });
    }
  });
});

// Routes
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/survey", require("./routes/surveyRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));

app.use("/api/dailySurvey", require("./routes/surveyRoutes"));
app.use("/api/Surveys", require("./routes/surveyRoutes"));
app.use("/api/weeklySurveys", require("./routes/surveyRoutes"));

app.use(errorHandler);
