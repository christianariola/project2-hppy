import { Doughnut } from "react-chartjs-2";
// import { ArcElement } from "chart.js";
// import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
const DoughnutChart = props => {

     //use this state variable to store data fetched from the database
    const [ surveyItem, setSurveyItems ] = useState([])


    useEffect(function loadData(){
        axios.get('/dailySurvey') 
         .then((res)=>{
            setSurveyItems(res.data)
         })
         
        .catch(error=>console.log(error))
     },[]) 
     
     console.log(report)
    
     //sort daily feeling object by date 
    var totalRate = function(){
        var rating = [];
        for(var i=0; i<report.length; i++){
            if(report[i].dailySurvey.dailySurveyDate === "2022628"){ {/* depends on button value */}
            rating.push(report[i].dailySurvey.dailyTotalRating);
            }
        }
        return rating;
    }

    totalRate();
    console.log(totalRate());
    
    // var satisfaction = new Array();
    var satisfaction = [];

     satisfaction.push("france")
     console.log(satisfaction)
    const arr = [2,3,4,4,4,5,5,5,1,1,1,1,1,2,2]; 

//     const result = arr.reduce((accu,curr)=> {
//     accu.set(curr, (accu.get(curr)||0) +1) ;
//     return accu;
//     },new Map());

//     for (let [key, value] of result.entries()) {
//     console.log(key + ' : ' + value );
// }
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

export default DoughnutChart