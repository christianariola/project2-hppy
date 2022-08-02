import CompanyData from "./CompanyData"
import EmployeeData from "./EmployeeData"
import SurveyData from "./SurveyData"
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios'
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const SuperAdminDashboard = () => {

  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(function loadData(){
    axios.get('/api/stats/dashboard')
    .then((res)=>{
        setDashboardStats(res.data)
        setLoading(false)
      })
      
      .catch(error=>console.log(error))
  },[]) 

  console.log(loading)
  
  if(loading){
    return <>
    <div
      style={{
        // do your styles depending on your needs.
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CircularProgress color="primary"  />
    </div>

    </>
  } else {
    return <>
      <h2>Dashboard</h2>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <CompanyData datastat={dashboardStats.companies ? dashboardStats.companies : 0} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <EmployeeData datastat={dashboardStats.employees ? dashboardStats.employees : 0} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <SurveyData datastat={dashboardStats.totalSurveys ? dashboardStats.totalSurveys : 0} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  }


}

export default SuperAdminDashboard
