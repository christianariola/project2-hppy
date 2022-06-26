import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Error404 from "./pages/Error404";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/** public routes */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/** restricted routes */}
          <Route
            element={
              <RequireAuth allowedRoles={["employee", "superadmin", "admin"]} />
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="/dailysurvey"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={["superadmin", "admin"]} />}
          >
            <Route path="employee/add" element={<AddEmployee />} />
          </Route>

          {/** catch all */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
