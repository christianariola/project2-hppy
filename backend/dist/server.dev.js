"use strict";

var express = require("express");

var colors = require("colors");

var dotenv = require("dotenv").config();

var _require = require("./middleware/errorMiddleware"),
    errorHandler = _require.errorHandler;

var connectDB = require("./config/db");

var cors = require("cors");

var cloudinary = require("./cloudinary/cloudinary");

var _require2 = require("express"),
    json = _require2.json;

var morgan = require("morgan");

var schedule = require("node-schedule");

var cron = require("node-cron");

var PORT = process.env.PORT || 3001; // Connect to database

connectDB();
var app = express(); //Cors Configuration - Start

app.use(cors()); //Cors Configuration - End

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
}); // HTTP request logger

app.use(morgan("dev"));
app.get("/", function (req, res) {
  res.send("Welcome to Hppy");
}); //report(view) schema
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

var _require3 = require("./models/dailySurveyModel"),
    DailySurvey = _require3.DailySurvey; //POST /Daily

/* This is a post request to the server. */


app.post("/dailySurvey", function (req, res) {
  var dailySurvey = new DailySurvey(req.body);
  dailySurvey.save(function (err) {
    if (err) {
      console.log(err.code);
      err.code === 11000 ? res.status(400).json({
        message: "Survey Already Exists"
      }) : res.status(400).send(err); //   res.status(400).json({
      //     error: "Survey Already Exists",
      //   });
      // res.status(400).json(err);
    } else {
      res.status(201).json({
        message: "New Survey Saved",
        Survey: dailySurvey
      });
    }
  });
}); //get daily survey data and displaying in front by hyewon

app.get("/dailySurvey", function (req, res) {
  DailySurvey.find({}).exec(function (error, result) {
    if (error) {
      res.send(500).json(error);
    } else {
      res.json(result);
    }
  });
}); //Monthly Survey Schema

var _require4 = require("./models/MonthlySurveyModel"),
    MonthlySurvey = _require4.MonthlySurvey; //POST Montly Survey


app.post("/monthlySurveys", function (req, res) {
  var monthlySurvey = new MonthlySurvey(req.body);
  monthlySurvey.save(function (err) {
    if (err) {
      console.log(err.response.data);
      err.code === 11000 ? res.status(400).json({
        message: "Monthly Survey Already Exists"
      }) : res.status(400).send(err);
    } else {
      res.status(201).json({
        message: "New Monthly Survey Saved",
        Survey: monthlySurvey
      });
    }
  });
});
app.patch("/monthlySurveys", function _callee(req, res, error) {
  var query, updatedDoc, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          query = {
            surveyid: req.body.surveyid
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(MonthlySurvey.findOne(query));

        case 4:
          updatedDoc = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(updatedDoc.updateOne(req.body));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(MonthlySurvey.findOne(query));

        case 9:
          result = _context.sent;
          console.log(result);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app.get('/monthlySurveys', function (req, res) {
  MonthlySurvey.find({}).exec(function (error, result) {
    if (error) {
      res.send(500).json(error);
    } else {
      res.json(result); // console.log(result)
    }
  }); // getEmployeeEmail()
}); //employee Survey Schema

var Employee = require("./models/employeeModel");

var _require5 = require("./models/employeeModel"),
    update = _require5.update; //post employee


app.post("/getEmployeeAll", function (req, res) {
  var employee = new Employee(req.body);
  employee.save(function (err) {
    if (err) {
      console.log(err.code);
      err.code === 11000 ? res.status(400).json({
        message: "Employee Already Exists"
      }) : res.status(400).send(err);
    } else {
      res.status(201).json({
        message: "New employee Saved"
      });
    }
  });
}); //get employee

app.get("/getEmployeeAll", function (req, res) {
  console.log("here!!!!!!");
  Employee.find({}).exec(function (error, result) {
    if (error) {
      res.send(500).json(error);
    } else {
      res.json(result);
    }
  });
}); // Routes

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/getEmployeeAll", require("./routes/employeeRoutes"));
app.use("/api/survey", require("./routes/surveyRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/dailySurvey", require("./routes/surveyRoutes"));
app.use("/api/Surveys", require("./routes/surveyRoutes"));
app.use("/api/monthlySurvey", require("./routes/surveyRoutes"));
app.use(errorHandler); // ===== Node-schedular ======= 
// cron tab for every month format: 
// const scheduleDate = new Date('0 0 1 * *');
//  in order to do not compomise data just before presentation, this function commented out
// const scheduleDate = new Date('* * * * *');
// const job = schedule.scheduleJob(scheduleDate, function () {
//   getEmployeeEmail()
// console.log("A new survey has to bee send to mongoDB at:", new Date().toString());
// });
// create a dateHandler for date variable

var dateHandler = function dateHandler() {
  var newDate = new Date();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear(); // console.log(`${year}${month<10?`0${month}`:`${month}`}${date}`)

  return "".concat(year).concat(month < 10 ? "0".concat(month) : "".concat(month));
}; // “At 00:00 on day-of-month 1 in January, February, March, April, May, June, July, August, September, October, November, and December.”
// 00 00 1 1,2,3,4,5,6,7,8,9,10,11,12 *


var job = cron.schedule("43 2 * * *", function () {
  // Do whatever you want in here. Send email, Make  database backup or download data.
  date = dateHandler();
  Employee.find({}).exec(function (error, result) {
    if (error) {
      console.log(error);
    } else {
      result.forEach(function (emp) {
        // let test = 'tester.Rod@twitter.com'
        //  console.log(emp.email)
        var updateValue = {
          surveyid: emp.email + date,
          employeeEmail: emp.email,
          surveyName: "Survey".concat(date),
          surveyType: "Monthly Survey",
          createdDate: "202205",
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
              answer7a: ""
            }
          },
          monthlyFeeling: "",
          monthlySentiment: "",
          monthlyTotalRating: ""
        };
        MonthlySurvey.create({
          'employeeEmail': emp.email
        }, // MonthlySurvey.save({ 'employeeEmail': emp.email },
        updateValue, function (error, docs) {
          if (error) {
            console.log(error);
          } else {
            console.log(docs);
          }
        });
      });
    }
  });
  console.log("Data", new Date().toLocaleString());
});

var showData = function showData() {
  console.log("running cron");
}; // take all employee emails 


var getEmployeeEmail = function getEmployeeEmail() {};