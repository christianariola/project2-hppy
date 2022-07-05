import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
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
     },[surveyItem]) 
     console.log(surveyItem)
    //  console.log(surveyItem[1].dailySurvey.surveyName)

    var satisfaction = new Array();

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
    arr.forEach((x)=>{
        result[x] = (result[x] || 0)+1;
    })

    console.log(result);
    const data = {
        labels: ["Very unsatisfactory", "Unsatisfactory", "Neutra", "Satisfactory", "Very Satisfactory"],
        datasets : [{
            label: "User Gain",
            data:[result[1], result[2], result[3], result[4], result[5]],
            backgroundColor:["#0098FF", "#00CF92","#F72564","#F8D919","#E07116"]
        }]
    }
    return(
        <div>
            <h2>Dairy Survey</h2>
            <Doughnut data={data} />
        
        </div>
    )
}

export default DoughnutChart