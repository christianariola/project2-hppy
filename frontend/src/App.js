import './style.css'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Login from './pages/Login'
import AddEmployee from './pages/AddEmployee'
import DashboardLayout from './layouts/DashboardLayout'
import Error404 from './pages/Error404'
import Unauthorized from './pages/Unauthorized'
import MainLayout from './layouts/MainLayout'
import About from './pages/main/About'
import Main from './pages/main/Main'

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import HodDashboard from './pages/hod/HodDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'

import DailySurvey from './components/DailySurvey'
import ReportMain from './pages/report/ReportMain'
import Myaccount from  './pages/Myaccout'
import DoughnutChart from './pages/report/DoughnutChart'

const App = () => {

  const { employee } = useSelector(state => state.auth)
  let dashboardIndex

  if(employee){
    switch (employee.role) {
      case "superadmin":
        dashboardIndex = <SuperAdminDashboard />
        break;
      case "admin":
        dashboardIndex = <AdminDashboard />
        break;
      case "hod":
        dashboardIndex = <HodDashboard />
        break;
      case "employee":
        dashboardIndex = <EmployeeDashboard />
        break;
      default:
        dashboardIndex = <EmployeeDashboard />
        break;
    }
  } else {
    dashboardIndex = {}
  }


  return <>
    <Routes>
      {/** public routes */}
      <Route path='/' element={<MainLayout />} exact>
        <Route path="/" element={<Main />} />
        <Route path="about" element={<About />} />

        {/** catch everything */}
        <Route path="*" element={<Error404 />} />
      </Route>
      
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      
      {/** restricted routes */}

      <Route element={<RequireAuth allowedRoles={["employee", "superadmin", "admin"]} />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="dashboard" element={dashboardIndex}></Route>
          <Route path="dailysurvey" element={<DailySurvey />}></Route>
          <Route path="myaccount" element={<Myaccount />}></Route>

          <Route element={<RequireAuth allowedRoles={["superadmin", "admin"]} />}>
            <Route path="employee/add" element={<AddEmployee />} />
            <Route path="report" element={<ReportMain />} />
            <Route path="reportchart" element={<DoughnutChart />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </>
}

export default App
