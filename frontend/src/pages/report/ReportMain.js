// import DoughnutChart from "./DoughnutChart"
import { useState, useEffect } from "react";
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
const ReportMain = props => {

  const [ surveyItem, setSurveyItems ] = useState([])
  const [ monthlyItem, setMonthlyItems ] = useState([])

  //daily survey fetching
    useEffect(function loadData(){
        axios.get('https://pluto-hppy.herokuapp.com/dailySurvey')
        .then((res)=>{
            setSurveyItems(res.data)
         })
         
         .catch(error=>console.log(error))
     },[]) 
     console.log(surveyItem)

    
// store daily  survey date and name to array
     var dailySingle = function(){
      
      var singleList = [];
    
      for(var i=0; i<surveyItem.length; i++){
        var obj = {
          surveyDate : surveyItem[i].dailySurvey.dailySurveyDate,
          // surveyTitle : surveyItem[i].dailySurvey.surveyName
          surveyTitle: surveyItem[i].surveyType
        }
        singleList.push(obj)
        
        
          }
      
      return singleList;
  }
      dailySingle();
      console.log(dailySingle())

    
    
     console.log([...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse));

     const sortDailySurvey = [...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse)

    // store monthly survey date and name to array
    var monthlySingle = function(){
      
      var monthlySingleList = [];
    
      for(var i=0; i<monthlyItem.length; i++){
        var obj = {
          monthlysurveyDate : monthlyItem[i].createdDate,
          monthlysurveyTitle: monthlyItem[i].surveyType
        }
        monthlySingleList.push(obj)
        
        
      }
      
      return monthlySingleList;
    }
      monthlySingle();
      console.log(monthlySingle())

    
    
     console.log([...new Set(monthlySingle().map(JSON.stringify))].map(JSON.parse));

     const sortMonthlySurvey = [...new Set(monthlySingle().map(JSON.stringify))].map(JSON.parse)

    console.log(sortMonthlySurvey)

    const [getDate, setGetDate] = useState([]);

    useEffect(function loadDate(){
    axios.get('https://pluto-hppy.herokuapp.com/view/:surveyDate')
    .then((res)=>{
       setGetDate(res.data)
     })
     .catch(error=>console.log(error))
    },[])

    console.log(getDate)


     //monthly survey fetching
     useEffect(function loadMonthly(){
      axios.get('https://pluto-hppy.herokuapp.com/monthlySurveys')
     .then((res)=>{
      setMonthlyItems(res.data)
      })
      .catch(error=>console.log(error))
  },[]) 
  console.log(monthlyItem)

  //chosen date handler
  // const handleChangeDate = (date)=>{
  //   // event.preventDefault()
  //   // props.handleSelectChartDate(date)
  //   props.setGetDate(date) //from App.js
  //   console.error(date);
  //   // props.setChosenDate(event.target.value)

  // }

  
  return (
    <div className="report-pageA">
      <h1>Reports</h1>
      <table>
        <thead>
            <tr className="report-list">
              <th>Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
          
            {sortDailySurvey?.map((sortDailySurvey)=>
            <tr className="report-content">
              
                <td key={surveyItem.surveyId}>{sortDailySurvey.surveyDate}</td>
             
                <td>{sortDailySurvey.surveyTitle}</td>
                
                <td>
                  <button value={sortDailySurvey.surveyDate} onClick={e => props.handleSelectChartDate(e.target.value)}>
                  <Link component={RouterLink} to={`/app/reportchart/${sortDailySurvey.surveyDate}`} variant="button" sx={{ my: 1, mx: 1.5 }}>View</Link>
                  </button>
                
                  <button>Active</button>
                </td>
            </tr>
            
              )}
              {sortMonthlySurvey?.map((sortMonthlySurvey)=>
              <tr className="report-content">
                  <td key={monthlyItem.surveyid}>{sortMonthlySurvey.monthlysurveyDate}</td>
                  <td>{sortMonthlySurvey.monthlysurveyTitle}</td>
                  <td>
                    <button value={sortMonthlySurvey.monthlysurveyDate} onClick={e => props.handleSelectChartDate(e.target.value)}>
                    <Link component={RouterLink} to={`/app/reportchart/${sortMonthlySurvey.monthlysurveyDate}`} variant="button" sx={{ my: 1, mx: 1.5 }}>View</Link>
                  </button>
                  
                    <button>Active</button>
                </td>
              </tr>
              )}  
            
        </tbody>
      </table>
      <button className="showBtn">Show More</button>
      
    </div>
  )
}

export default ReportMain
