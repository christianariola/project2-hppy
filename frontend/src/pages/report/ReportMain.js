// import DoughnutChart from "./DoughnutChart"
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

const ReportMain = props => {

  
  const [ surveyItem, setSurveyItems ] = useState([])
  const [ weeklyItem, setWeeklyItems ] = useState([])

    //daily survey fetching
    useEffect(function loadData(){
         axios.get('/dailySurvey')
        .then((res)=>{
            setSurveyItems(res.data)
         })
         
         .catch(error=>console.log(error))
     },[]) 
     console.log(surveyItem)

     //weekly survey fetching
     useEffect(function loadWeekly(){
      axios.get('/weeklysurveys')
     .then((res)=>{
      setWeeklyItems(res.data)
      })
      
      .catch(error=>console.log(error))
  },[]) 
  console.log(weeklyItem)

  //chosen date handler
  const handleChangeDate = (event)=>{
    event.preventDefault()
    props.setChosenDate(event.target.value)
  }


  return (
    <div>
      <h1>Survey Report</h1>
      <table>
        <thead>
            <tr className="report-list">
              <th>Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            {surveyItem?.map((surveyItem)=>
            <div>
                <td key={surveyItem.surveyId}>{surveyItem.dailySurvey.dailySurveyDate}</td>
                <td>{surveyItem.dailySurvey.surveyName}</td>
                <td><button value={surveyItem.dailySurvey.dailySurveyDate} onChange={(event)=>handleChangeDate(event)}>
                  
                  <Link to="/app/reportchart/{}" >View</Link>
                  </button>
                  
                  </td>
                
                <td><button>Active</button></td>
            </div>
            
              )}
            <div>
              {weeklyItem?.map((weeklyItem)=>
                  <td>{weeklyItem.surveyId}</td>
                
              )}
            </div>  
            </tr>
        </tbody>
      </table>
      
    </div>
  )
}

export default ReportMain
