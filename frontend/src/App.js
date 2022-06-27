import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import AddEmployee from './pages/AddEmployee'
import Dashboard from './components/Dashboard'
import Error404 from './pages/Error404'
import Unauthorized from './pages/Unauthorized'
import MainLayout from './layouts/MainLayout'
import About from './pages/main/About'
import Main from './components/Main'

const App = () => {
  return <>
    <Routes>
      {/** public routes */}
      <Route exact path='/' element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="about" element={<About />} />
      </Route>
      
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      
      {/** restricted routes */}
      <Route element={<RequireAuth allowedRoles={["employee", "superadmin", "admin"]} />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["superadmin", "admin"]} />}>
        <Route path="employee/add" element={<AddEmployee />} />
      </Route>

      {/** catch everything */}
      <Route path="*" element={<Error404 />} />

    </Routes>
  </>
}

export default App