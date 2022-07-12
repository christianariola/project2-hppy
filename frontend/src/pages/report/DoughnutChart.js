import { Doughnut } from "react-chartjs-2";
// import { ArcElement } from "chart.js";
// import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
import Barchart from './Barchart'
const DoughnutChart = props => {

     //use this state variable to store data fetched from the database
    const [ report, setReport ] = useState([])


    useEffect(function loadData(){
        axios.get('/dailySurvey') 
         .then((res)=>{
            setReport(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(report)
    
     //sort daily feeling object by date 
    var feelingList = function(){
        var feeling = [];
        for(var i=0; i<report.length; i++){
            if(report[i].dailySurvey.dailySurveyDate === "2022627"){ {/* depends on button value */}
            feeling.push(report[i].dailySurvey.dailyFeeling);
            }
        }
        return feeling;
    }

    feelingList();
    console.log(feelingList());
    
    // var satisfaction = new Array();

    //  satisfaction.push("france")
    //  console.log(satisfaction)
    // const arr = [2,3,4,4,4,5,5,5,1,1,1,1,1,2,2]; 
    // console.log(report.dailySurvey.surveyid) //undefined
    // const feeling = [];

    // const feelingObj = { 
    //     dailyFeeling:"1",
    //     dailyFeeling: "2", 
    //     dailyFeeling:"3",
    //     dailyFeeling:"3",
    //     dailyFeeling:"3",
    //     dailyFeeling:"5",
    //     dailyFeeling:"5",
    //     dailyFeeling:"4"
    // }

    // console.log(feeling)
    // for(var key in users) {
    //     allUsers.push(users[key]);
    // }
    // feeling.push(report.dailySurvey.dailyFeeling)
    // console.log(feeling)


    const result = {};
    feelingList().forEach((x)=>{
        result[x] = (result[x] || 0)+1;
    })

    console.log(result);
    const data = {
        labels: ["bad", "Unsatisfactory", "Neutral", "Satisfactory", "Very Satisfactory"],
        datasets : [{
            label: "Employee Daily Feedback",
            data:[result[1], result[2], result[3],result[4], result[5]],
            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
        }]
    }
    return(
        <div>
            <h2>Dairy Survey</h2>
            <div>
             {/* {report?.map((report)=> //properly shows the data
            <h4>{report.dailySurvey.dailyFeeling}</h4>
             )} */}
            </div>
            <Bar data={data} />
             <Barchart />
        </div>
    )
}

export default DoughnutChart