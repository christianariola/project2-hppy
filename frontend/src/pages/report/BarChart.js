import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';

import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'
import MonthylyBar from "./MonthlyBar";
import SuperAdminChart from "./SuperAdminChart";
const BarChart = props => {
    Chart.register(ArcElement);
     //use this state variable to store data fetched from the database
    const [ report, setReport ] = useState([])
    const [ employeeData, setEmployeeData ] = useState([])
    const { employee } = useSelector((state) => state.auth);
    // const [department, setDepartment] = useState('')

    //daily survey fetching
    useEffect(function loadData(){
        axios.get('https://pluto-hppy.herokuapp.com/dailySurvey') 
         .then((res)=>{
            setReport(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
    
     
    // console.log(report)

     //fetch  employees data
        useEffect(function loadEmployee(){
        axios.get('https://pluto-hppy.herokuapp.com/getEmployeeAll') 
         .then((res)=>{
            setEmployeeData(res.data)
            // console.log(res)
         
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
    


     
    // // console.log(monthlyReport)
    
    //  const { loginEmployee } = useSelector(state => state.auth) // ->작동되면 .role = 'superadmin' no filter, role 'admin' filetre by compaby
    //  let company = loginEmployee.company_name
      
     //store employees' email of the matched company
    //  console.log(employee.company_name)
     let company = employee.company_name
     console.log(company)
     let showEmailArry = [];
    //  console.log(employeeData.length);
    //  console.log(depart)
     for(let i=0; i<employeeData.length; i++){
        if(employeeData[i].company_name !== undefined && employeeData[i].company_name === company ){
            
                if(employeeData[i].department == "Meta") {
                    showEmailArry.push(employeeData[i].email)
                 } 
              else {
                showEmailArry.push(employeeData[i].email)
             }
        }
     }
     
    //  console.log(showEmailArry) //filted empployee email list by company

    
    //  let depart = 'all'
    
     const nameUrl = window.location.href
     const dateUrl = nameUrl.split('/');
     const chartDate = dateUrl[dateUrl.length-1] 
    //  const paramCheck = chartDate.split('?');
     
     //find matched employees' email from daily survey table
     let filteredDailySurvey = []; //store the daily survey data from filetered employees by company
     for(let j=0; j<report.length; j++){
        if(showEmailArry.includes(report[j].dailySurvey.employeeEmail)){
            filteredDailySurvey.push(report[j])
        }
        
     }
    //  console.log(filteredDailySurvey)
     
     //selected department
    //  const handleChange = departmentType =>{
    //     setDepartment(departmentType)
    // }
    
     //filter daily survey result by department and date
    //  let filteredDailySurveyByDepart = []; 
    // function filterByDepart(depart) { 
        
    //     let showDepartArry = [];
    //     filteredDailySurveyByDepart.length = 0;
    //     for(let i=0; i<employeeData.length; i++){
    //        if(employeeData[i].department != undefined && employeeData[i].department == "Meta" ){
    //            showDepartArry.push(employeeData[i].email)
    //        }
    //     }
    //     //filtered employee email by department
    //     // console.log(showDepartArry) 
   
    //     // let filteredDailySurveyByDepart = []; 
    //     for(let i=0; i<report.length; i++){
    //        if(showDepartArry.includes(report[i].dailySurvey.employeeEmail)){
    //         filteredDailySurveyByDepart.push(report[i])
    //        }
           
    //     }
    //     // console.log(filteredDailySurveyByDepart)
        
    //     return filterByDepart
   
    //    }

    //    filterByDepart()
    //    //total rating by departmnet
    //    function sortRateByDepart(){
    //     let totalRatingByDepart = [];
    //     const chartDate = dateUrl[dateUrl.length-1] 
        
    //     // console.log(chartDate)
    //     // let filteredDailySurvey=filterByCompany()  
    //     // date = {props.location.state.chartDate} 
    //     // if(depart == null) {
    //     //     let filteredDailySurvey=filterByCompany() 
    //     // } else {
    //     //     let filteredDailySurvey=filterByDepart(depart)  
    //     // }
    //     for(let i=0; i<filteredDailySurveyByDepart.length; i++){
    //         if(filteredDailySurveyByDepart[i].dailySurvey.dailySurveyDate === chartDate){
    //         totalRatingByDepart.push(filteredDailySurveyByDepart[i].dailySurvey.dailyTotalRating)
    //         }
    //     }
        
    //     // console.log(totalRatingByDepart)
    //     return totalRatingByDepart
       
    //    }

    //    sortRateByDepart()

    //    const rateResultByDepart = {};
    //    sortRateByDepart().forEach((x)=>{
    //     rateResultByDepart[x] = (rateResultByDepart[x] || 0)+1;
    //    })
   
    // //    console.log(rateResultByDepart);
    //    const dataByDepart = {
    //        labels: ["Very unsatisfactory", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
    //        datasets : [{
    //            label: "Employee Daily Total Rate",
    //            data:[rateResultByDepart[1], rateResultByDepart[2], rateResultByDepart[3],rateResultByDepart[4], rateResultByDepart[5]],
    //            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
    //        }]
    //    }
    
    
     //sort daily feeling object by date 
    let totalDailyRate = function(){
        let rating = [];
    
        // console.log(chartDate)
        // if(paramCheck.length > 1){
        //    let params =  paramCheck[1].split('=');
        //    depart = params[1]
        // }
        // let filteredDailySurvey=filterByCompany()  
        // date = {props.location.state.chartDate} 
        // if(depart == null) {
        //     let filteredDailySurvey=filterByCompany() 
        // } else {
        //     let filteredDailySurvey=filterByDepart(depart)  
        // }
        for(let i=0; i<filteredDailySurvey.length; i++){
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

    // console.log(result);
    const data = {
        labels: ["Very unsatisfactory", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
        datasets : [{
            label: "Employee Daily Total Rate",
            data:[result[1], result[2], result[3],result[4], result[5]],
            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
        }]
    }
     


    //daily survey submission data by date
    let getSurveySubmit = function(){
        let surveySubmit = [];
        // const nameUrl = window.location.href
        // const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-1] 
        // console.log(chartDate)
        for(let i=0; i<filteredDailySurvey.length; i++){
            if(showEmailArry.includes(filteredDailySurvey[i].dailySurvey.employeeEmail) && filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate) {
                

                // console.log(filteredDailySurvey[i].dailySurvey)
                let surveyState = {};

                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "submitted";

                surveySubmit.push(surveyState) // something went wrong 
                
        }
        else {

                let surveyState = {};
               
                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "unsubmitted";

                surveySubmit.push(surveyState)
            }
        }
        return surveySubmit;
        
        // for(let i=0; i<filteredDailySurvey.length; i++){
        //     if(filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate){
        //     surveySubmit.push(filteredDailySurvey[i].dailySurvey.dailySurveyState);
        //     } 
        // }
        // return surveySubmit;
    }
    

    getSurveySubmit();
    // console.log(getSurveySubmit());

    //global letiable
    // let nameUrl = window.location.href
    // const dateUrl = nameUrl.split('/');
    const surveyType = dateUrl[dateUrl.length-2] 
    // console.log(surveyType)

  
  
    // for(let i=0; i<getSurveySubmit().length; i++){
    //    let totalStatement = []
    //    totalStatement.push(getSurveySubmit()[i].surveyStatement)
    // }

    // console.log(totalStatement);

    //total rate of daily survey submission
    let totalStatement = function(){
      
        let submissionTotal = [];
      
        for(let i=0; i<getSurveySubmit().length; i++){
            submissionTotal.push(getSurveySubmit()[i].surveyStatement)          
            }
        
            // console.log(submissionTotal);
            return submissionTotal;
    }

    totalStatement()

    const submissionResult = {};
    totalStatement().forEach((x)=>{
        submissionResult[x] = (submissionResult[x] || 0)+1;
    })

    // console.log(submissionResult);

    
    const submitData = {
        labels: ["Unsubmitted", "Submitted"],
        datasets : [{
            label: "Daily Survey Submittion Rate",
            data:[submissionResult.unsubmitted, submissionResult.submitted], 
            backgroundColor:["#0098FF", "#00CF92"],
            
        }]
    }

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    
    //     //axios post to /dailySurvey endpoint
        
    //   };

   
    return(
       
        <div>
            { surveyType == "Daily" && employee.role == "admin" ?
             <div> 
                <h1>Daily Survey Report - {chartDate}  </h1>
                {/* <form>
                    <select onChange={e => filterByDepart(e.target.value)}>
                        <option>All</option>
                        <option value="Meta">Meta</option>
                        <option value="Marketplace">Marketplace</option>
                    </select>
                </form> */}
                <h2 className="report-title">Submission Rate</h2>
                <Pie data={submitData} 
                    width="20%"
                    height="20%"
                    options ={{ 
                        responsive: true,
                        maintainAspectRatio: true,	// Don't maintain w/h ratio
                        
                    }}
                />
                <h2 class="report-title">Total Rating</h2>
                    <div>
                        <Bar data={data} 
                             options={{
                                scales:{
                                    y:{
                                        min:0,
                                        max:5,
                                        ticks:{stepSize:1}
                                    }
                                }
                            }}
                        />
                    </div>
            </div>
            : ( surveyType == "Daily" && employee.role == "superadmin" 
            ?
            <div> 
                <SuperAdminChart />
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