// import DoughnutChart from "./DoughnutChart"
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

const ReportMain = () => {

  const [ surveyItem, setSurveyItems ] = useState([])

    useEffect(function loadData(){
         axios.get('/dailySurvey')
        .then((res)=>{
            setSurveyItems(res.data)
         })
         
         .catch(error=>console.log(error))
     },[]) 
     console.log(surveyItem)
  return (
    <div>
      <h1>Survey Report</h1>
      <ul>
            {surveyItem?.map((surveyItem)=>
                <li key={surveyItem.surveyid}>
                      <Link to="/app/reportchart"><p>{surveyItem.dailySurvey.surveyName}</p></Link>
                </li>
                
            )}
            
            
        </ul>
    </div>
  )
}

export default ReportMain
