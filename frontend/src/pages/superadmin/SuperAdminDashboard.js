import CompanyData from "./CompanyData"
import EmployeeData from "./EmployeeData"
import SurveyData from "./SurveyData"
import { Box, Container, Grid } from '@mui/material';

const SuperAdminDashboard = () => {
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
            <CompanyData />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <EmployeeData />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <SurveyData />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
}

export default SuperAdminDashboard
