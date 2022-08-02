import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
// import { useSelector } from 'react-redux'
import SuperAdminMonthly from "./SuperAdminMonthly";
const SuperAdminChart = props => {
    Chart.register(ArcElement);
   
     //use this state letiable to store data fetched from the database
    const [ report, setReport ] = useState([])
    const [ employeeData, setEmployeeData ] = useState([])
    // const { employee } = useSelector((state) => state.auth);
    

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
     
    


     
     const nameUrl = window.location.href
     const dateUrl = nameUrl.split('/');
     const chartDate = dateUrl[dateUrl.length-2] 
     const selectedCompany = dateUrl[dateUrl.length-1] 
     const decodedCompany = decodeURI(selectedCompany)
     console.log(decodedCompany)
    // // console.log(monthlyReport)
    
    //  const { loginEmployee } = useSelector(state => state.auth) // ->작동되면 .role = 'superadmin' no filter, role 'admin' filetre by compaby
    //  let company = loginEmployee.company_name
      
     //store employees' email of the matched company
    //  console.log(employee.company_name)
    //  let company = employee.company_name
     let showEmailArry = [];
    //  console.log(employeeData.length);
    //  console.log(depart)
     for(let i=0; i<employeeData.length; i++){
        if(employeeData[i].company_name !== undefined && employeeData[i].company_name === decodedCompany ){
            
                if(employeeData[i].department === decodedCompany) {
                    showEmailArry.push(employeeData[i].email)
                 } 
              else {
                showEmailArry.push(employeeData[i].email)
             }
        }
     }
     
    //  console.log(showEmailArry) //filted empployee email list by company

    
    //  let depart = 'all'
    

    //  const paramCheck = chartDate.split('?');
     
     //find matched employees' email from daily survey table
     let filteredDailySurvey = []; //store the daily survey data from filetered employees by company
     for(let i=0; i<report.length; i++){
        if(showEmailArry.includes(report[i].dailySurvey.employeeEmail)){
            filteredDailySurvey.push(report[i])
        }
        
     }
     console.log(filteredDailySurvey)
     
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
    //     const chartDate = dateUrl[dateUrl.length-2] 
        
    //     // console.log(chartDate)
    //     // let filteredDailySurvey=filterByCompany()  
    //     // date = {props.location.state.chartDate} 
    //     // if(depart == null) {
    //     //     let filteredDailySurvey=filterByCompany() 
    //     // } else {
    //     //     let filteredDailySurvey=filterByDepart(depart)  
    //     // }
    //     for(let i=0; i<filteredDailySurveyByDepart.length; i++){
    //         if(filteredDailySurveyByDepart[i].dailySurvey.dailySurveyDate === chartDate){ {/* depends on button value */}
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
     
    console.log(showEmailArry) //company employees
    console.log(filteredDailySurvey)
    //daily survey submission data by date
    let getSurveySubmit = function(){
        let surveySubmit = [];
        // const nameUrl = window.location.href
        // const dateUrl = nameUrl.split('/');
        const chartDate = dateUrl[dateUrl.length-2] 
        // console.log(chartDate)
        

        // const filterd = filteredDailySurvey.filter(function(emp){
        //     return emp.dailySurvey.employeeEmail == showEmailArry
        // })

        // console.log(filterd)
        for(let i=0; i<filteredDailySurvey.length; i++){
            
            if(showEmailArry.includes(filteredDailySurvey[i].dailySurvey.employeeEmail) && filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate ) {
                

                let surveyState = {};
                // console.log(filteredDailySurvey[i].dailySurvey)
               

                surveyState['email'] = filteredDailySurvey[i].dailySurvey.employeeEmail;
                surveyState['surveyStatement'] = "submitted";

                surveySubmit.push(surveyState) // something went wrong 
                
                
        }
             else if(showEmailArry ) {
                
                let surveyState = {};
               
                surveyState['email'] = showEmailArry
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
    console.log(getSurveySubmit());

    //global letiable
    // let nameUrl = window.location.href
    // const dateUrl = nameUrl.split('/');
    const surveyType = dateUrl[dateUrl.length-3] 
    // const decodedType = decodeURI(surveyType)
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
            { surveyType === "Daily" ?
             <div> 
                <h1>{decodedCompany}'s Daily Report - {chartDate} </h1>
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
                <h2 className="report-title">Total Rating</h2>
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
            
            : <SuperAdminMonthly />
            }
        </div>
    )
}

export default SuperAdminChart