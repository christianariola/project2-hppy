import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'
import MonthylyBar from "./MonthlyBar";

const Department =  props => {
    const [ report, setReport ] = useState([])
    const [ employeeData, setEmployeeData ] = useState([])
    const { employee } = useSelector((state) => state.auth);
    const [department, setDepartment] = useState('')

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
            console.log(res)
         
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
    


     
    // // console.log(monthlyReport)
    
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
     
     //selected department
     const handleChange = departmentType =>{
        setDepartment(departmentType)
    }
    
     //filter daily survey result by department and date
    var filteredDailySurveyByDepart = []; 
    const nameUrl = window.location.href
    const dateUrl = nameUrl.split('/');
    const departType = dateUrl[dateUrl.length-1] 
    function filterByDepart(depart) { 
        var showDepartArry = [];
        for(var i=0; i<employeeData.length; i++){
           if(employeeData[i].department != undefined && employeeData[i].department == departType ){
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
      
        return filterByDepart
   
       }

       filterByDepart()

       function sortRateByDepart(){
        var totalRatingByDepart = [];
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
       const dataByDepart = {
           labels: ["Very unsatisfactory", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
           datasets : [{
               label: "Employee Daily Total Rate",
               data:[rateResultByDepart[1], rateResultByDepart[2], rateResultByDepart[3],rateResultByDepart[4], rateResultByDepart[5]],
               backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
           }]
        }
    return(
            <div>
                <h1>Department</h1>
            {/* ( 
            ?
            <div> 
            <form>
                <select>
                <select onChange={e => filterByDepart()}>
                        <option>Department</option>
                        <option value="meta">Meta</option>
                        <option value='martketplace'>Marketplace</option>
                    </select>
                </select>
            </form>
            <h2>Daily Survey Submission Rate By "Department name"</h2>
            <Pie data={dataByDepart} />
            <h2>Daily Total Rating</h2>
                <div>
                    <Bar data={data} />
                </div>
            </div>
        
            ) */}
            </div>
        )
}
export default Department

        