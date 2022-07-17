// import DoughnutChart from "./DoughnutChart"
import { useState, useEffect } from "react";
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
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
      dailySingle();
      console.log(dailySingle())

    
    
     console.log([...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse));

     const sortDailySurvey = [...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse)

    //fetching daily survey date
    // let { surveyDate } = useParams(); //??

    const [getDate, setGetDate] = useState([]);

    useEffect(function loadDate(){
    axios.get('/view/:surveyDate')
    .then((res)=>{
       setGetDate(res.data)
     })
     .catch(error=>console.log(error))
    },[])

    console.log(getDate)


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
  const handleChangeDate = (date)=>{
    // event.preventDefault()
    // props.handleSelectChartDate(date)
    props.setGetDate(date) //from App.js
    console.error(date);
    // props.setChosenDate(event.target.value)

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
                  <button value={sortDailySurvey.surveyDate} onClick={e => props.handleSelectChartDate(e.target.value)}>
                  <Link component={RouterLink} to={`/app/reportchart/${sortDailySurvey.surveyDate}`} variant="button" sx={{ my: 1, mx: 1.5 }}>View</Link>
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
