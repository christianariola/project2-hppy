import { Bar } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'
const BarChart = props => {

   
     //use this state variable to store data fetched from the database
    const [ report, setReport ] = useState([])
    const [ employee, setEmployee ] = useState([])
    // const [ view, setView ] = useState([])

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
            setEmployee(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(employee)
    
    //  const { loginEmployee } = useSelector(state => state.auth) // ->작동되면 .role = 'superadmin' no filter, role 'admin' filetre by compaby
    //  var company = loginEmployee.company_name
      
     
     var company = "Facebook"
     var showEmailArry = [];
     for(var i=0; i<employee.length; i++){
        if(employee[i].company_name != undefined && employee[i].company_name === company ){
            showEmailArry.push(employee[i].email)
        }
     }
     //find employee email from daily survey 
     console.log(showEmailArry)

     var filteredDailySurvey = [];
     for(var i=0; i<report.length; i++){
        if(showEmailArry.includes(report[i].dailySurvey.employeeEmail)){
            filteredDailySurvey.push(report[i])
        }
        
     }
     console.log(filteredDailySurvey)

   
    
     
    function filterByDepart(depart) { 
        var showDepartArry = [];
        for(var i=0; i<employee.length; i++){
           if(employee[i].department != undefined && employee[i].department === depart ){
               showDepartArry.push(employee[i].email)
           }
        }
        //find employee email from daily survey 
        console.log(showDepartArry)
   
        var filteredDailySurvey = [];
        for(var i=0; i<report.length; i++){
           if(showDepartArry.includes(report[i].dailySurvey.employeeEmail)){
               filteredDailySurvey.push(report[i])
           }
           
        }
        console.log(filteredDailySurvey)
   
        return filterByDepart
   
       }
    
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
            if(filteredDailySurvey[i].dailySurvey.dailySurveyDate === chartDate){ {/* depends on button value */}
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
    return(
        <div>
            <h2>Daily Total Rating</h2>
            <div>
             {/* {report?.map((report)=> //properly shows the data
            <h4>{report.dailySurvey.dailyFeeling}</h4>
             )} */}
            </div>
            <Bar data={data} />
             {/* <Barchart /> */}
        </div>
    )
}

export default BarChart