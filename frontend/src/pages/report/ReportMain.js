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

    
// store survey date and name to array
     var dailySingle = function(){
      
      var singleList = [];
    
      for(var i=0; i<surveyItem.length; i++){
        var obj = {
          surveyDate : surveyItem[i].dailySurvey.dailySurveyDate,
          surveyTitle: surveyItem[i].dailySurvey.surveyName
        }
        singleList.push(obj)
        
        
          }
      
      return singleList;
  }
      // var dailySingle = [surveyItem.dailySurvey.dailySurveyDate];
      // var newDaily = dailySingle.concat(surveyItem.dailySurvey.dailySurveyDate)
      dailySingle();
      console.log(dailySingle())

     

      // const newArr = [];
      // dailySingle().forEach((element) => {
      //   if (!newArr.includes(element)) {
      //     newArr.push(element);
      //   }
      // });
      // console.log(newArr)
    
     console.log([...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse));

     const sortDailySurvey = [...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse)



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
            {sortDailySurvey?.map((sortDailySurvey)=>
            <div>
                <td key={surveyItem.surveyId}>{sortDailySurvey.surveyDate}</td>
                <td>{sortDailySurvey.surveyTitle}</td>
                <td>
                  <button value={sortDailySurvey.surveyDate} onChange={(event)=>handleChangeDate(event)}>
                  <Link to="/app/reportchart">View</Link>
                  </button>
                </td>
                <td>
                  <button>Active</button>
                </td>
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
