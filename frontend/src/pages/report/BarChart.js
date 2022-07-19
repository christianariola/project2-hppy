import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
// import { ArcElement } from "chart.js";
// import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
// import { useSelector } from 'react-redux'
const BarChart = props => {

   
     //use this state variable to store data fetched from the database
    const [ report, setReport ] = useState([])
    const [ employee, setEmployee ] = useState([])
  

    //daily survey fetching
    useEffect(function loadData(){
        axios.get('https://pluto-hppy.herokuapp.com/dailySurvey') 
         .then((res)=>{
            setReport(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(report)

     //fetch  employees data
     useEffect(function loadEmployee(){
        axios.get('https://pluto-hppy.herokuapp.com/getEmployeeAll') 
         .then((res)=>{
            setEmployee(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(employee)
    
    //  const { loginEmployee } = useSelector(state => state.auth) // ->작동되면 .role = 'superadmin' no filter, role 'admin' filetre by compaby
    //  var company = loginEmployee.company_name
      
     //store employees' email of the matched company
     var company = "Facebook"
     var showEmailArry = [];
     for(var i=0; i<employee.length; i++){
        if(employee[i].company_name !== undefined && employee[i].company_name === company ){
            showEmailArry.push(employee[i].email)
        }
     }
     
     console.log(showEmailArry) //filted empployee email list by company

    

     //find matched employees' email from daily survey table
     var filteredDailySurvey = []; //store the daily survey data from filetered employees by company
     for(var j=0; j<report.length; j++){
        if(showEmailArry.includes(report[j].dailySurvey.employeeEmail)){
            filteredDailySurvey.push(report[j])
        }
        
     }
     console.log(filteredDailySurvey)

   
    
     
    // function filterByDepart(depart) { 
    //     var showDepartArry = [];
    //     for(var i=0; i<employee.length; i++){
    //        if(employee[i].department !== undefined && employee[i].department === depart ){
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

       
     //fetch  employee view table's data
    //  useEffect(function loadEmployee(){
    //     axios.get('/reportview') 
    //      .then((res)=>{
    //         setView(res.data)
    //      })
         
    //     .catch(error=>console.log(error))
    //  },[]) 
     
    //  console.log(view)
    
     //sort daily feeling object by date 
    var totalRate = function(){
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
            if(filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate){
            rating.push(filteredDailySurvey[i].dailySurvey.dailyTotalRating)
            }
        }
        console.log(rating);
        return rating;
    }

    totalRate();
    // console.log(rating);
    
    
    const result = {};
    totalRate().forEach((x)=>{
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

    //survey submission data by date
    var getSurveySubmit = function(){
        var surveySubmit = [];
        var surveyState = {};
        const nameUrl = window.location.href
        const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-1] 
        // console.log(chartDate)
        for(var i=0; i<filteredDailySurvey.length; i++){
            if(showEmailArry.includes(filteredDailySurvey[i].dailySurvey.employeeEmail) && filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate) {
                

                console.log(filteredDailySurvey[i].dailySurvey)
                // var surveyState = {};

                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "submitted";

                surveySubmit.push(surveyState)
                
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
    return(
        <div>
            {/* if() */}
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
             {/* <Barchart /> */}
        </div>
    )
}

export default BarChart