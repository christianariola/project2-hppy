const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const cloudinary = require("./cloudinary/cloudinary")
const { json } = require("express");
const morgan = require("morgan");
const schedule = require("node-schedule");

const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

const app = express();

//Cors Configuration - Start
app.use(cors());
//Cors Configuration - End

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// HTTP request logger
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Hppy");

});

//report(view) schema
const {Report} = require("./models/reportModel");

//post ?? do i need ?
app.post("/reportview", (req, res) => {
  let report = new Report(req.body);

  report.save((err) => {
    if (err) {
      console.log(err.code);
      err.code === 11000
        ? res.status(400).json({
            message: "Report Exists",
          })
        : res.status(400).send(err);
    } else {
      res.status(201).json({
        message: "Report Saved"
      });
    }
  });
});

//get view data
app.get('/reportview', (req, res)=>{
  Report.find({})
  .exec((error, result)=>{
      if(error){
          res.send(500).json(error)
      } else {
          res.json(result)
      }
  })
})


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
//get monthly survey data
// app.get('/monthlySurveys', (req, res)=>{
//   MonthlySurvey.find({})
//   .exec((error, result)=>{
//       if(error){
//           res.send(500).json(error)
//       } else {
//           res.json(result)
//       }
//   })
// })

app.get('/monthlySurveys', (req, res) => {
  // Survey.find({})
  //   .exec((error, result) => {
  //     if (error) {
  //       res.send(500).json(error)
  //     } else {
  //       res.json(result)
  //     }
  // })
  // getEmployeeEmail()

})

//employee Survey Schema
const Employee = require("./models/employeeModel");

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
        message: "New employee Saved"
      });
    }
  });
});

//get employee
app.get("/getEmployeeAll",(req, res) => {
  Employee.find({})
  .exec((error, result)=>{
      if(error){
          res.send(500).json(error)
      } else {
          res.json(result)
      }
  })
})
// Routes
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/getEmployeeAll", require("./routes/employeeRoutes"));
app.use("/api/survey", require("./routes/surveyRoutes"))
app.use("/api/companies", require("./routes/companyRoutes"))
app.use("/api/reports", require("./routes/reportRoutes"))

app.use("/api/dailySurvey", require("./routes/surveyRoutes"));
app.use("/api/Surveys", require("./routes/surveyRoutes"));
app.use("/api/monthlySurvey", require("./routes/surveyRoutes"));

app.use(errorHandler);


// ===== Node-schedular ======= 
// cron tab for every month format: 
// const scheduleDate = new Date('0 0 1 * *');
const scheduleDate = new Date('* * * * *');


const job = schedule.scheduleJob(scheduleDate, function () {
  
  console.log("A new survey has to bee send to mongoDB at:", new Date().toString());
//   // run().catch(console.dir);


	    







  // app.post("/monthlySurveys", (req, res) => {

  //   let monthlySurvey = new MonthlySurvey(req.body);
    




  // monthlySurvey.save((err) => {
  //   if (err) {
  //     console.log(err.response.data);
  //     err.code === 11000
  //       ? res.status(400).json({
  //           message: "Monthly Survey Already Exists",
  //         })
  //       : res.status(400).send(err);
  //   } else {
  //     console.log(res);
  //     res.status(201).json({
  //       message: "New Monthly Survey Saved",
  //       Survey: monthlySurvey,
  //     });
  //   }
  // });
  // });
  
});
    
  const getEmployeeEmail =  function () {
              Employee.find({})
    .exec((error, result)=>{
      if(error){
          console.log(error)
      } else {
        result.forEach((emp) => {
          // let test = 'tester.Rod@twitter.com'
          // console.log(emp.email)
           let updateValue = {
        surveyid: test,
        employeeEmail: emp.email,
        surveyType: "monthlySurvey",
        createdDate: "2022-07-21",
        surveyStatus: "incompleated",
        surveyOpened: "non-visited",
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
          }
        },
        monthlyFeeling: "",
        monthlySentiment: "",
        monthlyTotalRating: ""
           }
          
          
        MonthlySurvey.updateMany({ 'employeeEmail': emp.email }, updateValue, function (error, docs) {
            if (error) {
              console.log(error)
            } else {
              console.log(docs)
            }
          })
         
          
        // foundItem.updateOne(updateValue)  
        })
      }
  })
  }


  
  

