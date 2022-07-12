import { Bar } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios'
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
    var sentimentList = function(){
        var sentiment = [];
        for(var i=0; i<report.length; i++){

            sentiment.push(report[i].dailySurvey.dailySentiment);
            
        }
        return sentiment;
    }

    sentimentList();
    console.log(sentimentList());
  


    const sentimentResult = {};
    sentimentList().forEach((x)=>{
        sentimentResult[x] = (sentimentResult[x] || 0)+1;
    })

    console.log(sentimentResult);
    const sentimentData = {
        labels: ["Negative", "Neutral", "Positive",],
        datasets : [{
            label: "Daily Comment",
            data:[sentimentResult.negative, sentimentResult.neutral, sentimentResult.positive],
            backgroundColor:["#0098FF", "#00CF92","#F72564"]
        }]
    }
    return(
        <div>
            <h2>Dairy Sentiment Analysis</h2>
            <Bar data={sentimentData} />        
        </div>
    )
}

export default DoughnutChart