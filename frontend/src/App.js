import "./style.css";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import AddEmployee from "./components/employee/AddEmployee";
import DashboardLayout from "./layouts/DashboardLayout";
import Error404 from "./pages/Error404";
import Unauthorized from "./pages/Unauthorized";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/main/About";
import Main from "./pages/main/Main";
import Surveys from "./components/surveys/Surveys";

import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HodDashboard from "./pages/hod/HodDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import DailySurvey from "./components/DailySurvey";
import ReportMain from "./pages/report/ReportMain";
import MyAccount from "./pages/MyAccount";
import Password from "./pages/Password";
import BarChart from "./pages/report/BarChart";


import Myaccount from  './pages/Myaccout'

import Department from './pages/report/Department'

import Company from './components/company/Company'
import AddEditCompany from './components/company/AddEditCompany'
import ViewCompany from './components/company/ViewCompany'
import SuperAdminChart from './pages/report/SuperAdminChart'



import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";

const App = () => {

  // const customTheme =createMuiTheme({
  //   palette:{
  //     main:'#003D66'
  //   }
  // })

  const [chartDate, setChartDate] = useState();

  const handleSelectChartDate = (date) => {
    setChartDate(date);
  };

  const { employee } = useSelector((state) => state.auth);
  let dashboardIndex;

  if (employee) {
    switch (employee.role) {
      case "superadmin":
        dashboardIndex = <SuperAdminDashboard />;
        break;
      case "admin":
        dashboardIndex = <AdminDashboard />;
        break;
      case "manager":
        dashboardIndex = <HodDashboard />;
        break;
      case "employee":
        dashboardIndex = <EmployeeDashboard />;
        break;
      default:
        dashboardIndex = <EmployeeDashboard />;
        break;
    }
  } else {
    dashboardIndex = {};
  }

  return (
    <>
      <ToastContainer closeButton={false} position="top-right" />
      <Routes>
        {/** public routes */}
        <Route path="/" element={<MainLayout />} exact>
          <Route path="/" element={<Main />} />
          <Route path="about" element={<About />} />

          {/** catch everything */}
          <Route path="*" element={<Error404 />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        <Route path="login" element={<Login />} />

        {/** restricted routes */}

        <Route
          element={
            <RequireAuth allowedRoles={["employee", "superadmin", "admin", "manager"]} />
          }
        >
          <Route path="/app" element={<DashboardLayout />}>
            <Route path="dashboard" element={dashboardIndex}></Route>
            <Route path="dailysurvey" element={<DailySurvey />}></Route>
            <Route path="account" element={<MyAccount />}></Route>
            <Route path="account/password" element={<Password />}></Route>
            <Route path="surveys" element={<DailySurvey />}></Route>
            <Route path="monthlySurveys" element={<Surveys />}></Route>
            <Route
              element={<RequireAuth allowedRoles={["superadmin", "admin"]} />}
            >
              <Route path="company/:companyId/employee/add" element={<AddEmployee />} />
              <Route path="company/:companyId/employee/view/:empId" element={<ViewEmployee />} />
              <Route path="company/:companyId/employee/edit/:empId" element={<EditEmployee />} />
              <Route
                path="report"
                element={
                  <ReportMain handleSelectChartDate={handleSelectChartDate} />
                }
              />
              <Route path="reportchart" element={<BarChart />} />
              <Route path="reportchart/:type/:surveyDate" element={<BarChart chartDate={chartDate} />} />
              {/*survey date */}
              <Route path="reportview" element={<BarChart />} />{" "}
              {/*employee view  */}
            </Route>

            {/* Super Admin Only */}
            <Route element={<RequireAuth allowedRoles={["superadmin"]} />}>
              <Route path="companies" element={<Company />}></Route>
              <Route path="companies/add" element={<AddEditCompany />} />
              <Route
                path="company/edit/:companyId"
                element={<AddEditCompany />}
              />
              <Route path="company/:companyId" element={<ViewCompany />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
