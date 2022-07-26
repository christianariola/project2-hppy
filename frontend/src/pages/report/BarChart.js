import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import { Link as RouterLink } from 'react-router-dom';
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'
import MonthylyBar from "./MonthlyBar";
const BarChart = props => {

   
     //use this state variable to store data fetched from the database
    const [ report, setReport ] = useState([])
    const [ employeeData, setEmployeeData ] = useState([])
    const { employee } = useSelector((state) => state.auth);
    const [department, setDepartment] = useState('')
    const [ barData, setBarChartData ] = useState([])
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
        axios.get('/getEmployeeAll') 
         .then((res)=>{
            setEmployeeData(res.data)
            console.log(res)
         
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
    

     var dailySingle = function(){
      
        var singleList = [];
      
        for(var i=0; i<report.length; i++){
          var obj = {
            surveyDate : report[i].dailySurvey.dailySurveyDate,
            // surveyTitle : surveyItem[i].dailySurvey.surveyName
            surveyTitle: report[i].surveyType
          }
          singleList.push(obj)
          
          
            }
        
        return singleList;
    }
        dailySingle();
        console.log(dailySingle())
  
      
      
       console.log([...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse));
  
       const sortDailySurvey = [...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse)
     
    // // console.log(monthlyReport)
    
    //  const { loginEmployee } = useSelector(state => state.auth) // ->작동되면 .role = 'superadmin' no filter, role 'admin' filetre by compaby
    //  var company = loginEmployee.company_name
      
     //store employees' email of the matched company
     console.log(employee.company_name)
     var company = employee.company_name
     var showEmailArry = [];
     console.log(employeeData.length);
     console.log(depart)
     for(var i=0; i<employeeData.length; i++){
        if(employeeData[i].company_name !== undefined && employeeData[i].company_name === company ){
            if(depart != "all" && depart !=undefined){
                if(employeeData[i].department == depart) {
                    showEmailArry.push(employeeData[i].email)
                 } 
             } else {
                showEmailArry.push(employeeData[i].email)
             }
        }
     }
     
     console.log(showEmailArry) //filted empployee email list by company

    
     var depart = 'all'
     var rating = [];
     const nameUrl = window.location.href
     const dateUrl = nameUrl.split('/');
     const titleUrl = dateUrl[dateUrl.length-2] 
     const chartDate = dateUrl[dateUrl.length-1] 
     const paramCheck = chartDate.split('?');
    //  const testUrl = nameUrl((JSON.stringify))
     
     //find matched employees' email from daily survey table
     var filteredDailySurvey = []; //store the daily survey data from filetered employees by company
     for(var j=0; j<report.length; j++){
        if(showEmailArry.includes(report[j].dailySurvey.employeeEmail)){
            filteredDailySurvey.push(report[j])
        }
        
     }
     console.log(filteredDailySurvey)
     
     //selected department
     const handleChange = departmentType =>{
        setDepartment(departmentType)
    }
    
     //filter daily survey result by department and date
     var filteredDailySurveyByDepart = []; 
    function filterByDepart(depart) { 
        
        // var url = nameUrl + '?' + 'param' + '=' + depart;
        // console.log(depart)
        
        if(depart != undefined && depart == "All"){
        axios
          .get("/login")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            
              console.log(err);
            
          });
        } else {
            return 
        }

        var showDepartArry = [];
        filteredDailySurveyByDepart.length = 0;
        for(var i=0; i<employeeData.length; i++){
           if(employeeData[i].department != undefined && employeeData[i].department == depart ){
               showDepartArry.push(employeeData[i].email)
           }
        }
        //filtered employee email by department
        console.log(showDepartArry) 
   
        // var filteredDailySurveyByDepart = []; 
        for(var i=0; i<report.length; i++){
           if(showDepartArry.includes(report[i].dailySurvey.employeeEmail)){
            filteredDailySurveyByDepart.push(report[i])
           }
           
        }
        console.log(filteredDailySurveyByDepart)
        var totalRatingByDepart = sortRateByDepart()

       var rateResultByDepart = {};
       sortRateByDepart().forEach((x)=>{
        rateResultByDepart[x] = (rateResultByDepart[x] || 0)+1;
       })

       const dataByDepart = {
        labels: ["Very unsatisfactory", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
        datasets : [{
            label: "Employee Daily Total Rate",
            data:[rateResultByDepart[1], rateResultByDepart[2], rateResultByDepart[3],rateResultByDepart[4], rateResultByDepart[5]],
            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
        }]
        }

        // var grapharea = document.getElementById("pie-chart").getContext("2d");
        // console.log(grapharea);
        // grapharea.clear();

        // var myNewChart = new Chart(grapharea, { type: 'pie', data: dataByDepart });
        // myNewChart.render()
        return filterByDepart
        
       }

       filterByDepart()
       //total rating by departmnet
       function sortRateByDepart(){
        var totalRatingByDepart = [];
        const chartDate = dateUrl[dateUrl.length-1] 
        
        console.log(chartDate)
        // var filteredDailySurvey=filterByCompany()  
        // date = {props.location.state.chartDate} 
        // if(depart == null) {
        //     var filteredDailySurvey=filterByCompany() 
        // } else {
        //     var filteredDailySurvey=filterByDepart(depart)  
        // }
        for(var i=0; i<filteredDailySurveyByDepart.length; i++){
            if(filteredDailySurveyByDepart[i].dailySurvey.dailySurveyDate === chartDate){ {/* depends on button value */}
            totalRatingByDepart.push(filteredDailySurveyByDepart[i].dailySurvey.dailyTotalRating)
            }
        }
        
        console.log(totalRatingByDepart)
        return totalRatingByDepart
       
       }

       sortRateByDepart()

       const rateResultByDepart = {};
       sortRateByDepart().forEach((x)=>{
        rateResultByDepart[x] = (rateResultByDepart[x] || 0)+1;
       })
   
       console.log(rateResultByDepart);
      
    
    
     //sort daily feeling object by date 
    var totalDailyRate = function(){
       
    
        console.log(chartDate)
        if(paramCheck.length > 1){
           var params =  paramCheck[1].split('=');
           depart = params[1]
        }
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
        // console.log(rating);
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
     


    //daily survey submission data by date
    var getSurveySubmit = function(){
        var surveySubmit = [];
        // const nameUrl = window.location.href
        // const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-1] 
        // console.log(chartDate)
        for(var i=0; i<filteredDailySurvey.length; i++){
            if(showEmailArry.includes(filteredDailySurvey[i].dailySurvey.employeeEmail) && filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate) {
                

                // console.log(filteredDailySurvey[i].dailySurvey)
                var surveyState = {};

                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "submitted";

                surveySubmit.push(surveyState) // something went wrong 
                
        }
        else {

                var surveyState = {};
               
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
    // var nameUrl = window.location.href
    // const dateUrl = nameUrl.split('/');
    const surveyType = dateUrl[dateUrl.length-2] 
    console.log(surveyType)

  
  
    // for(var i=0; i<getSurveySubmit().length; i++){
    //    var totalStatement = []
    //    totalStatement.push(getSurveySubmit()[i].surveyStatement)
    // }

    // console.log(totalStatement);

    //total rate of daily survey submission
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        //axios post to /dailySurvey endpoint
        
      };

   
    return(
       
        <div>
            { surveyType == "Daily" ?
             <div> 
                <form >
                    <select onChange={(e)=>filterByDepart(e.target.value)}>
                        <option>All</option>
                        <option value="meta">Meta</option>                       
                        <option value="Marketplace">Marketplace</option>
                    </select>
                </form>
                <h2>Daily Survey Submission Rate</h2>
                <div id="pie-chart">
                    <Pie 
                        data={submitData} 
                        width="20%"
                        height="20%"
                        options ={{ 
                            responsive: true,
                            maintainAspectRatio: true,	// Don't maintain w/h ratio
                        }}
                    />
                </div>
                <h2>Daily Total Rating</h2>
                    <div>
                        <Bar data={data} />
                    </div>
            </div>
            : ( surveyType == "Daily" && filterByDepart() != null 
            ?
            <div> 
                <h1>department</h1>
            {/* <form>
                <select>
                <select onChange={e => filterByDepart()}>
                        <option>Department</option>
                        <option value="Meta">Meta</option>
                        <option value='Martketplace'>Marketplace</option>
                    </select>
                </select>
            </form>
            <h2>Daily Survey Submission Rate By "Department name"</h2>
            <Pie data={dataByDepart} />
            <h2>Daily Total Rating</h2>
                <div>
                    <Bar data={data} />
                </div> */}
        </div>
        :<MonthylyBar />
            )
            }
        </div>
    )
}

export default BarChart