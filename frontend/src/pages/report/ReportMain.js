import DoughnutChart from "./DoughnutChart"
import { useState, useEffect } from "react";
import axios from 'axios'
// import {Route, Link, Routes} from 'react-router-dom'

const ReportMain = () => {

  
  const [ surveyItem, setSurveyItems ] = useState([])

    useEffect(function loadData(){
         axios.get('/dailySurvey')
        .then((res)=>{
            setSurveyItems(res.data)
         })
         
         .catch(error=>console.log(error))
     },[surveyItem]) 
     console.log(surveyItem)
  return (
    <div>
      <h1>Survey Report</h1>
      <ul>
            {surveyItem?.map((surveyItem)=>
                <li key={surveyItem.surveyid}>
                      <h3>{surveyItem.dailySurvey.surveyName}</h3>
                </li>
                
            )}
            
        </ul>
      <DoughnutChart />
    </div>
  )
}

export default ReportMain
