import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'
const BarChart = props => {

   
     //use this state variable to store data fetched from the database
    const [ report, setReport ] = useState([])
    const [ employeeData, setEmployeeData ] = useState([])
    const [ monthlyReport, setMonthlyReport ] = useState([])
    const { employee } = useSelector((state) => state.auth);

    //daily survey fetching
    useEffect(function loadData(){
        axios.get('/dailySurvey') 
         .then((res)=>{
            setReport(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(report)

     //fetch  employees data
     useEffect(function loadEmployee(){
        axios.get('/getEmployeeAll') 
         .then((res)=>{
            setEmployeeData(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(employeeData)

     //monthly survey fetching
     useEffect(function loadMonthly(){
        axios.get('/monthlySurveys')
       .then((res)=>{
        setMonthlyReport(res.data)
        })
        .catch(error=>console.log(error))
    },[]) 
    console.log(monthlyReport)
    
    //  const { loginEmployee } = useSelector(state => state.auth) // ->작동되면 .role = 'superadmin' no filter, role 'admin' filetre by compaby
    //  var company = loginEmployee.company_name
      
     //store employees' email of the matched company
     console.log(employee.company_name)
     var company = employee.company_name
     var showEmailArry = [];
     for(var i=0; i<employeeData.length; i++){
        if(employeeData[i].company_name !== undefined && employeeData[i].company_name === company ){
            showEmailArry.push(employeeData[i].email)
        }
     }
     
     console.log(showEmailArry) //filted empployee email list by company

    

     //find matched employees' email from daily survey table
     var filteredDailySurvey = []; //store the daily survey data from filetered employees by company
     for(var i=0; i<report.length; i++){
        if(showEmailArry.includes(report[i].dailySurvey.employeeEmail)){
            filteredDailySurvey.push(report[i])
        }
        
     }
     console.log(filteredDailySurvey)
     
     //find matched employees' email from monthly survey table
     var filteredMonthlySurvey = []; //store the monthly survey data from filetered employees by company
     for(var k=0; k<monthlyReport.length; k++){
        if(showEmailArry.includes(monthlyReport[k].employeeEmail)){
            filteredMonthlySurvey.push(monthlyReport[k])
        }
        
     }
     console.log(filteredMonthlySurvey)

    
     
    // function filterByDepart(depart) { 
    //     var showDepartArry = [];
    //     for(var i=0; i<employee.length; i++){
    //        if(employee[i].department != undefined && employee[i].department === depart ){
    //            showDepartArry.push(employee[i].email)
    //        }
    //     }
    //     //find employee email from daily survey 
    //     console.log(showDepartArry)
   
    //     var filteredDailySurvey = []; 
    //     for(var i=0; i<report.length; i++){
    //        if(showDepartArry.includes(report[i].dailySurvey.employeeEmail)){
    //            filteredDailySurvey.push(report[i])
    //        }
           
    //     }
    //     console.log(filteredDailySurvey)
   
    //     return filterByDepart
   
    //    }


    
     //sort daily feeling object by date 
    var totalDailyRate = function(){
        var rating = [];
        const nameUrl = window.location.href
        const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-1] 
        console.log(chartDate)
        // var filteredDailySurvey=filterByCompany()  
        // date = {props.location.state.chartDate} 
        // if(depart == null) {
        //     var filteredDailySurvey=filterByCompany() 
        // } else {
        //     var filteredDailySurvey=filterByDepart(depart)  
        // }
        for(var i=0; i<filteredDailySurvey.length; i++){
            if(filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate){ {/* depends on button value */}
            rating.push(filteredDailySurvey[i].dailySurvey.dailyTotalRating)
            }
        }
        console.log(rating);
        return rating;
    }

    totalDailyRate();
    // console.log(rating);
    
    
    const result = {};
    totalDailyRate().forEach((x)=>{
        result[x] = (result[x] || 0)+1;
    })

    console.log(result);
    const data = {
        labels: ["Very unsatisfactory", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
        datasets : [{
            label: "Employee Daily Total Rate",
            data:[result[1], result[2], result[3],result[4], result[5]],
            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
        }]
    }
      //sort monthly total feeling object by date 
      var totalMonthlyRate = function(){
        var monthlyRating = [];
        const nameUrl = window.location.href
        const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-1] 
        console.log(chartDate)
        // var filteredDailySurvey=filterByCompany()  
        // date = {props.location.state.chartDate} 
        // if(depart == null) {
        //     var filteredDailySurvey=filterByCompany() 
        // } else {
        //     var filteredDailySurvey=filterByDepart(depart)  
        // }
        for(var j=0; j<filteredMonthlySurvey.length; j++){
            if(filteredMonthlySurvey[j].createdDate === chartDate){
            monthlyRating.push(filteredMonthlySurvey[j].monthlyTotalRating)
            }
        }
        console.log(monthlyRating); //empty?
        return monthlyRating;
    }

    totalMonthlyRate();
    // console.log(rating);
    
    
    const monthlyResult = {};
    totalMonthlyRate().forEach((x)=>{
        monthlyResult[x] = (monthlyResult[x] || 0)+1;
    })
   
    const monthlyData = {
        labels: ["Very unsatisfactory", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
        datasets : [{
            label: "Employee monthly Total Rate",
            data:[monthlyResult[1], monthlyResult[2], monthlyResult[3],monthlyResult[4], monthlyResult[5]],
            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
        }]
    }


    //daily survey submission data by date

    var surveySubmit = [];
    var surveyState = {};
    const nameUrl = window.location.href
    const dateUrl = nameUrl.split('/');

    var getSurveySubmit = function(){
       
        const chartDate = dateUrl[dateUrl.length-1] 
        // console.log(chartDate)
        for(var i=0; i<filteredDailySurvey.length; i++){
            if(showEmailArry.includes(filteredDailySurvey[i].dailySurvey.employeeEmail) && filteredDailySurvey[i].dailySurvey.dailySurveyDate == chartDate) {
                

                // console.log(filteredDailySurvey[i].dailySurvey)
                // var surveyState = {};

                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "submitted";

                surveySubmit.push(surveyState) // something went wrong 
                
        }
        else {
               
                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "unsubmitted";

                surveySubmit.push(surveyState)
            }
        }
        return surveySubmit;
        
        // for(var i=0; i<filteredDailySurvey.length; i++){
        //     if(filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate){
        //     surveySubmit.push(filteredDailySurvey[i].dailySurvey.dailySurveyState);
        //     } 
        // }
        // return surveySubmit;
    }
    

    getSurveySubmit();
    console.log(getSurveySubmit());

    //global variable
    const surveyType = dateUrl[dateUrl.length-2] 
    console.log(surveyType)

    //monthly survey submission data by date
    var getMonthlySurveySubmit = function(){
        var monthlysurveySubmit = [];
        var monthlySurveyState = {};
        const nameUrl = window.location.href
        const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-1] 
        // console.log(chartDate)
        for(var i=0; i<filteredMonthlySurvey.length; i++){
            if(showEmailArry.includes(filteredMonthlySurvey[i].employeeEmail) && filteredMonthlySurvey[i].createdDate == chartDate) {
                

                // console.log(filteredMonthlySurvey[i].dailySurvey)
                

                monthlySurveyState['email'] = filteredMonthlySurvey[i].employeeEmail;
                monthlySurveyState['surveyStatement'] = "submitted";

                monthlysurveySubmit.push(monthlySurveyState)
                
        }
        else {
               
                monthlySurveyState['email'] = filteredMonthlySurvey[i].employeeEmail;
                monthlySurveyState['surveyStatement'] = "unsubmitted";

                monthlysurveySubmit.push(monthlySurveyState)
            }
        }
        return monthlysurveySubmit;
        
        // for(var i=0; i<filteredDailySurvey.length; i++){
        //     if(filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate){
        //     surveySubmit.push(filteredDailySurvey[i].dailySurvey.dailySurveyState);
        //     } 
        // }
        // return surveySubmit;
    }
    

    getMonthlySurveySubmit();
    console.log(getMonthlySurveySubmit());
  
    // for(var i=0; i<getSurveySubmit().length; i++){
    //    var totalStatement = []
    //    totalStatement.push(getSurveySubmit()[i].surveyStatement)
    // }

    // console.log(totalStatement);

    var totalStatement = function(){
      
        var submissionTotal = [];
      
        for(var i=0; i<getSurveySubmit().length; i++){
            submissionTotal.push(getSurveySubmit()[i].surveyStatement)          
            }
        
            console.log(submissionTotal);
            return submissionTotal;
    }

    totalStatement()

    const submissionResult = {};
    totalStatement().forEach((x)=>{
        submissionResult[x] = (submissionResult[x] || 0)+1;
    })

    console.log(submissionResult);

    const submitData = {
        labels: ["Unsubmitted", "Submitted"],
        datasets : [{
            label: "Daily Survey Submittion Rate",
            data:[submissionResult.unsubmitted, submissionResult.submitted], 
            backgroundColor:["#0098FF", "#00CF92"],
            
        }]
    }

    // monthly total
    var monthlyTotalStatement = function(){
      
        var monthlySubmissionTotal = [];
      
        for(var i=0; i< getMonthlySurveySubmit().length; i++){
            monthlySubmissionTotal.push(getMonthlySurveySubmit()[i].surveyStatement)          
            }
        
            console.log(monthlySubmissionTotal);
            return monthlySubmissionTotal;
    }

    monthlyTotalStatement()

    const monthlySubmissionResult = {};
    monthlyTotalStatement().forEach((x)=>{
        monthlySubmissionResult[x] = (monthlySubmissionResult[x] || 0)+1;
    })

    console.log(monthlySubmissionResult);

    const monthlySubmitData = {
        labels: ["Unsubmitted", "Submitted"],
        datasets : [{
            label: "Monthly Survey Submittion Rate",
            data:[monthlySubmissionResult.unsubmitted, monthlySubmissionResult.submitted], 
            backgroundColor:["#0098FF", "#00CF92"],
            
        }]
    }

    console.log(surveyType)
    return(
        <div>
            {
            <div> surveyType == "Daily" ?
                
                <h2>Daily Survey Submission Rate</h2>
                <Pie data={submitData} 
                    width="20%"
                    height="20%"
                    options ={{ 
                        responsive: true,
                        maintainAspectRatio: true,	// Don't maintain w/h ratio
                    }}
                />
                <h2>Daily Total Rating</h2>
                    <div>
                        
                        <Bar data={data} />
                    </div>
                
            
            : 
            <h2>Monthly Survey Submission Rate</h2>
            <Pie data={monthlySubmitData} 
                width="20%"
                height="20%"
                options ={{ 
                    responsive: true,
                    maintainAspectRatio: true,	// Don't maintain w/h ratio
                }}
            />
            <h2>Monthly Total Rating</h2>
                <div>
                    
                    <Bar data={monthlyData} />
                </div>
            </div>
            }
            
        </div>
    )
}

export default BarChart