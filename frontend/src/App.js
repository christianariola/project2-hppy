import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/AddEmployee'
import Header from './components/Header'
import Footer from './components/Footer'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'

const App = () => {
  return <>
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee/add" element={<Register />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  </>
}

export default App