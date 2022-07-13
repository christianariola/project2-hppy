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
            <div>
                <td key={surveyItem.surveyId}>{surveyItem.dailySurvey.dailySurveyDate}</td>
                <td>{surveyItem.dailySurvey.surveyName}</td>
                <td>
                  <button value={surveyItem.dailySurvey.dailySurveyDate} onChange={(event)=>handleChangeDate(event)}>
                  <Link to="/app/reportchart/{}" >View</Link>
                  </button>
                </td>
                <td>
                  <button>Active</button>
                </td>
            </div>
            
            
        </ul>
    </div>
  )
}

export default ReportMain
