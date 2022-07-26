import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'

const MonthylyBar = props => {

    const [ employeeData, setEmployeeData ] = useState([])
    const [ monthlyReport, setMonthlyReport ] = useState([])
    const { employee } = useSelector((state) => state.auth);

    //monthly survey fetching
     
    useEffect(function loadMonthly(){
        axios.get('/monthlySurveys')
       .then((res)=>{
        setMonthlyReport(res.data)
        })
        .catch(error=>console.log(error))
    },[]) 

    //fetch  employees data
    useEffect(function loadEmployee(){
        axios.get('/getEmployeeAll') 
         .then((res)=>{
            setEmployeeData(res.data)
            console.log(res)
         
         })
         
        .catch(error=>console.log(error))
     },[]) 
     console.log(employee)  
    
    
    var company = employee.company_name
    var showEmailArry = [];
    for(var i=0; i<employeeData.length; i++){
       if(employeeData[i].company_name !== undefined && employeeData[i].company_name === company ){
           showEmailArry.push(employeeData[i].email)
       }
    }
    
    console.log(showEmailArry)
    //find matched employees' email from monthly survey table
    var filteredMonthlySurvey = []; //store the monthly survey data from filetered employees by company
    for(var k=0; k<monthlyReport.length; k++){
       if(showEmailArry.includes(monthlyReport[k].employeeEmail)){
           filteredMonthlySurvey.push(monthlyReport[k])
       }
       
    }
   //  console.log(filteredMonthlySurvey)

    // monthly survey
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
    
          //monthly survey submission data by date
          var getMonthlySurveySubmit = function(){
            var monthlysurveySubmit = [];
            // var monthlySurveyState = {};
            const nameUrl = window.location.href
            const dateUrl = nameUrl.split('/');
            const chartDate = dateUrl[dateUrl.length-1] 
            // console.log(chartDate)
            for(var i=0; i<filteredMonthlySurvey.length; i++){
                if(showEmailArry.includes(filteredMonthlySurvey[i].employeeEmail) && filteredMonthlySurvey[i].createdDate == chartDate) {
                    
    
                    // console.log(filteredMonthlySurvey[i].dailySurvey)
                    
                    var monthlySurveyState = {};
                    monthlySurveyState['email'] = filteredMonthlySurvey[i].employeeEmail;
                    monthlySurveyState['surveyStatement'] = "submitted";
    
                    monthlysurveySubmit.push(monthlySurveyState)
                    
            }
            else {
                    var monthlySurveyState = {};
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
    return(
         <div>
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
        
            
    )

}

export default MonthylyBar