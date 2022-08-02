// import DoughnutChart from "./DoughnutChart"
import { useState, useEffect } from "react";
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"
// import Button from '@mui/material/Button';
const ReportMain = props => {

  const [ surveyItem, setSurveyItems ] = useState([])
  const [ monthlyItem, setMonthlyItems ] = useState([])
  const { employee } = useSelector((state) => state.auth);
  const [ employeeData, setEmployeeData ] = useState([])

  //daily survey fetching
    useEffect(function loadData(){
        axios.get('https://pluto-hppy.herokuapp.com/dailySurvey')
        .then((res)=>{
            setSurveyItems(res.data)
         })
         
         .catch(error=>console.log(error))
     },[]) 
    //  console.log(surveyItem)


      //fetch  employees data
      useEffect(function loadEmployee(){
        axios.get('/getEmployeeAll') 
         .then((res)=>{
            setEmployeeData(res.data)
            // console.log(res)
         
         })
         
        .catch(error=>console.log(error))
     },[]) 
    // console.log(employeeData)

     //monthly survey fetching
  //    useEffect(function loadMonthly(){
  //     axios.get('/monthlySurveys')
  //    .then((res)=>{
  //     setMonthlyItems(res.data)
  //     })
  //     .catch(error=>console.log(error))
  // },[]) 
  // console.log(monthlyItem)


    //@desc report main for superadmin
    //sorting employees' email and company name
    let showEmailArry =[]
    for(let i=0; i<employeeData.length; i++){
      if(employeeData[i].company_name !== undefined ){
        let showEmailObj= {
          email: employeeData[i].email,
          company : employeeData[i].company_name
        }

        showEmailArry.push(showEmailObj)
      }
      }

    // console.log(showEmailArry) //store every employees' email and company name that are in company
    
      //sorting dailysurvey 
      let dailyArry = [];
      for(let i=0; i<surveyItem.length; i++){
        for(let k=0; k<showEmailArry.length; k++){
          if(surveyItem[i].dailySurvey.employeeEmail != undefined && surveyItem[i].dailySurvey.employeeEmail == showEmailArry[k].email){
          let emailObj = {
            surveyDate : surveyItem[i].dailySurvey.dailySurveyDate,
            surveyTitle: surveyItem[i].surveyType,
            // emails : surveyItem[i].dailySurvey.employeeEmail,
            companyName : showEmailArry[k].company
          }
          dailyArry.push(emailObj)
         }
        }
      }
      // console.log(dailyArry)
      
      const sortDailySurveyByCompany = [...new Set(dailyArry.map(JSON.stringify))].map(JSON.parse)
      // console.log(sortDailySurveyByCompany)
    
    
      let monthlyArry = [];
      for(let i=0; i<monthlyItem.length; i++){
        for(let k=0; k<showEmailArry.length; k++){
          if(monthlyItem[i].employeeEmail != undefined && monthlyItem[i].employeeEmail == showEmailArry[k].email){
          let monthlyEmailObj = {
            surveyDate : monthlyItem[i].createdDate,
            surveyTitle: monthlyItem[i].surveyType,
            // emails : surveyItem[i].dailySurvey.employeeEmail,
            companyName : showEmailArry[k].company
          }
          monthlyArry.push(monthlyEmailObj)
         }
        }
      }
      // console.log(monthlyArry)
      
      const sortMonthlySurveyByCompany = [...new Set(monthlyArry.map(JSON.stringify))].map(JSON.parse)
      // console.log(sortMonthlySurveyByCompany)




    //@desc report main for admin
    // store daily  survey date and name to array
     let dailySingle = function(){
      
      let singleList = [];
    
      for(let i=0; i<surveyItem.length; i++){
        let obj = {
          surveyDate : surveyItem[i].dailySurvey.dailySurveyDate,
          // surveyTitle : surveyItem[i].dailySurvey.surveyName
          surveyTitle: surveyItem[i].surveyType
        }
        singleList.push(obj)
        
        
          }
      // if (surveyItem[i].dailySurvey.employeeEmail == employeeData.email){
      //   singleList.push(employeeObj)
      // }
      
      return singleList;
  }
      dailySingle();
      // console.log(dailySingle())

    
    
    //  console.log([...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse));

     const sortDailySurvey = [...new Set(dailySingle().map(JSON.stringify))].map(JSON.parse)

    // store monthly survey date and name to array
    let monthlySingle = function(){
      
      let monthlySingleList = [];
    
      for(let i=0; i<monthlyItem.length; i++){
        let obj = {
          monthlysurveyDate : monthlyItem[i].createdDate,
          monthlysurveyTitle: monthlyItem[i].surveyType
        }
        monthlySingleList.push(obj)
        
        
      }
      
      return monthlySingleList;
    }
      monthlySingle();
      // console.log(monthlySingle())

    
    
    //  console.log([...new Set(monthlySingle().map(JSON.stringify))].map(JSON.parse));

     const sortMonthlySurvey = [...new Set(monthlySingle().map(JSON.stringify))].map(JSON.parse)

    // console.log(sortMonthlySurvey)

    // const [getDate, setGetDate] = useState([]);

   


    

  //chosen date handler
  // const handleChangeDate = (date)=>{
  //   // event.preventDefault()
  //   // props.handleSelectChartDate(date)
  //   props.setGetDate(date) //from App.js
  //   console.error(date);
  //   // props.setChosenDate(event.target.value)

  // }
  // console.log(employee.role)
  
  return (
    
    <div className="report-pageA">
   
      {employee.role == "superadmin" ?
      <div>
        <h1>Reports</h1>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select>
            <MenuItem><Link component={RouterLink} to={`/app/report`}  underline="none" color="inherit" >Daily</Link></MenuItem>
            <MenuItem><Link component={RouterLink} to={`/app/report/monthly`}  underline="none" color="inherit" >Monthly</Link></MenuItem>
          </Select>
        </FormControl>
      <table>
        <thead>
            <tr className="report-list">
              <th>Date</th>
              <th>Type</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
        </thead>
         <tbody>
          
            {sortDailySurveyByCompany?.map((sortDailySurveyByCompany)=>
            
              <tr className="report-content">
                
                  <td key={surveyItem.surveyId}>{sortDailySurveyByCompany.surveyDate}</td>
              
                  <td>{sortDailySurveyByCompany.surveyTitle}</td>
                  <td>{sortDailySurveyByCompany.companyName}</td>
                  
                  <td>
                    <button className="view-btn" value={sortDailySurveyByCompany.surveyDate} onClick={e => props.handleSelectChartDate(e.target.value)}>
                    <Link component={RouterLink} to={`/app/reportchart/${sortDailySurveyByCompany.surveyTitle}/${sortDailySurveyByCompany.surveyDate}/${sortDailySurveyByCompany.companyName}`} variant="button" sx={{ my: 1, mx: 1.5 }} underline="none" color="inherit" >View</Link>
                    </button>
                  </td>
              </tr>
              
                
                )}
                
               {/* {sortMonthlySurveyByCompany?.map((sortMonthlySurveyByCompany)=>
                <tr className="report-content">
                    <td key={monthlyItem.surveyid}>{sortMonthlySurveyByCompany.surveyDate}</td>
                    <td>{sortMonthlySurveyByCompany.surveyTitle}</td>
                    <td>{sortMonthlySurveyByCompany.companyName}</td>
                    <td>
                      <button className="view-btn" value={sortMonthlySurveyByCompany.surveyDate}  onClick={e => props.handleSelectChartDate(e.target.value)}>
                      <Link component={RouterLink} to={`/app/reportchart/${sortMonthlySurveyByCompany.surveyTitle}/${sortMonthlySurveyByCompany.surveyDate}/${sortMonthlySurveyByCompany.companyName}`} variant="button" sx={{ my: 1, mx: 1.5 }} underline="none" color="inherit" >View</Link>
                    </button>
                  </td>
                </tr>
                ) } */}
        </tbody>
      </table>
      </div>
      :(
        <div>
          <h1>Reports</h1>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Type</InputLabel>
                    <Select>
                      <MenuItem><Link component={RouterLink} to={`/app/report`} underline="none" color="inherit" >Daily</Link></MenuItem>
                      <MenuItem><Link component={RouterLink} to={`/app/report/monthly`} underline="none" color="inherit" >Monthly</Link></MenuItem>
                    </Select>
                  </FormControl>
          <table>
            <thead className="daily-list">
                <tr className="report-list">
                  <th>Date</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody className="daily-report">
          
            {sortDailySurvey?.map((sortDailySurvey)=>
            
              <tr className="report-content">
                
                  <td key={surveyItem.surveyId}>{sortDailySurvey.surveyDate}</td>
              
                  <td>{sortDailySurvey.surveyTitle} </td>
                  
                  <td>
                    <button className="view-btn" value={sortDailySurvey.surveyDate} onClick={e => props.handleSelectChartDate(e.target.value)}>
                    <Link component={RouterLink} to={`/app/reportchart/${sortDailySurvey.surveyTitle}/${sortDailySurvey.surveyDate}`} variant="button" sx={{ my: 1, mx: 1.5 }} underline="none" color="inherit" >View</Link>
                    </button>
                  </td>
              </tr>
              
                
                )}
                
               {/* {sortMonthlySurvey?.map((sortMonthlySurvey)=>
                <tr className="report-content">
                    <td key={monthlyItem.surveyid}>{sortMonthlySurvey.monthlysurveyDate}</td>
                    <td>{sortMonthlySurvey.monthlysurveyTitle}</td>
                    <td>
                      <button className="view-btn" value={sortDailySurvey.surveyDate} data-value1="monthly" onClick={e => props.handleSelectChartDate(e.target.value)}>
                      <Link component={RouterLink} to={`/app/reportchart/${sortMonthlySurvey.monthlysurveyTitle}/${sortMonthlySurvey.monthlysurveyDate}`} variant="button" sx={{ my: 1, mx: 1.5 }} underline="none" color="inherit" >View</Link>
                    </button>
                  </td>
                </tr>
                ) } */}
        </tbody>
      </table>
      </div>
                )
               
              }
      {/* <button className="showBtn">Show More</button> */}
     
      
      
    
    </div>
  )
}

export default ReportMain
