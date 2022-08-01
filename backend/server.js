const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const cloudinary = require("./cloudinary/cloudinary");
const { json } = require("express");
const morgan = require("morgan");
const schedule = require("node-schedule");
const cron = require("node-cron");

const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

const app = express();

//Cors Configuration - Start
app.use(cors());
//Cors Configuration - End

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// HTTP request logger
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Hppy");
});

//report(view) schema
// const {Report} = require("./models/reportModel");

// //post ?? do i need ?
// app.post("/reportview", (req, res) => {
//   let report = new Report(req.body);

//   report.save((err) => {
//     if (err) {
//       console.log(err.code);
//       err.code === 11000
//         ? res.status(400).json({
//             message: "Report Exists",
//           })
//         : res.status(400).send(err);
//     } else {
//       res.status(201).json({
//         message: "Report Saved"
//       });
//     }
//   });
// });

//get view data
// app.get('/reportview', (req, res)=>{
//   Report.find({})
//   .exec((error, result)=>{
//       if(error){
//           res.send(500).json(error)
//       } else {
//           res.json(result)
//       }
//   })
// })

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

//Monthly Survey Schema
const { MonthlySurvey } = require("./models/MonthlySurveyModel");

//POST Montly Survey

app.post("/monthlySurveys", (req, res) => {
  let monthlySurvey = new MonthlySurvey(req.body);

  monthlySurvey.save((err) => {
    if (err) {
      console.log(err.response.data);
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
app.patch("/monthlySurveys", async (req, res, error) => {
  try {
    let query = { surveyid: req.body.surveyid };
    const updatedDoc = await MonthlySurvey.findOne(query);
    await updatedDoc.updateOne(req.body);
    const result = await MonthlySurvey.findOne(query);
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  // console.log(req.body)
});

app.get("/monthlySurveys", (req, res) => {
  MonthlySurvey.find({}).exec((error, result) => {
    if (error) {
      res.send(500).json(error);
    } else {
      res.json(result);
      // console.log(result)
    }
  });
  // getEmployeeEmail()
});

//employee Survey Schema
const Employee = require("./models/employeeModel");
const { update } = require("./models/employeeModel");

//post employee
app.post("/getEmployeeAll", (req, res) => {
  let employee = new Employee(req.body);

  employee.save((err) => {
    if (err) {
      console.log(err.code);
      err.code === 11000
        ? res.status(400).json({
            message: "Employee Already Exists",
          })
        : res.status(400).send(err);
    } else {
      res.status(201).json({
        message: "New employee Saved",
      });
    }
  });
});

//get employee
app.get("/getEmployeeAll", (req, res) => {
  console.log("here!!!!!!");
  Employee.find({}).exec((error, result) => {
    if (error) {
      res.send(500).json(error);
    } else {
      res.json(result);
    }
  });
});
// Routes
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/getEmployeeAll", require("./routes/employeeRoutes"));
app.use("/api/survey", require("./routes/surveyRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

app.use("/api/dailySurvey", require("./routes/surveyRoutes"));
app.use("/api/Surveys", require("./routes/surveyRoutes"));
app.use("/api/monthlySurvey", require("./routes/surveyRoutes"));

app.use(errorHandler);

// ===== Node-schedular =======
// cron tab for every month format:
// const scheduleDate = new Date('0 0 1 * *');

//  in order to do not compomise data just before presentation, this function commented out
// const scheduleDate = new Date('* * * * *');

// const job = schedule.scheduleJob(scheduleDate, function () {
//   getEmployeeEmail()
// console.log("A new survey has to bee send to mongoDB at:", new Date().toString());

// });

// create a dateHandler for date variable
const dateHandler = () => {
  const date = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentDay = String(date.getDate()).padStart(2, "0");
  const together = [currentYear, currentMonth, currentDay].join("-");
  return together;
};

// “At 00:00 on day-of-month 1 in January, February, March, April, May, June, July, August, September, October, November, and December.”
// 00 00 1 1,2,3,4,5,6,7,8,9,10,11,12 *

// specific time cron
// 43 2 * * *

const job = cron.schedule("0 1 1 * *", () => {
  // Do whatever you want in here. Send email, Make  database backup or download data.
  date = dateHandler();

  Employee.find({}).exec((error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.forEach((emp) => {
        // let test = 'tester.Rod@twitter.com'
        //  console.log(emp.email)
        let updateValue = {
          surveyid: emp.email + date,
          employeeEmail: emp.email,
          surveyName: `MonthlySurvey${date}`,
          surveyType: "Monthly Survey",
          createdDate: date,
          surveyStatus: "incomplete",
          surveyOpened: false,
          monthlySurvey: {
            answers: {
              answer1: "",
              answer2: "",
              answer3: "",
              answer4: "",
              answer5: "",
              answer6: "",
              answer7: "",
              answer7a: "",
            },
          },
          monthlyFeeling: "",
          monthlySentiment: "",
          monthlyTotalRating: "",
        };

        MonthlySurvey.create(
          { employeeEmail: emp.email },

          // MonthlySurvey.save({ 'employeeEmail': emp.email },

          updateValue,
          function (error, docs) {
            if (error) {
              console.log(error);
            } else {
              console.log(docs);
            }
          }
        );
      });
    }
  });

  console.log("Data", new Date().toLocaleString());
});

const showData = () => {
  console.log("running cron");
};

// take all employee emails
const getEmployeeEmail = function () {};
