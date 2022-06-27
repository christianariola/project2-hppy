import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'
import DashboardFooter from '../components/DashboardFooter'

const Dashboard = () => {

    return <>
        <DashboardNavbar />
        <Outlet />
        <DashboardFooter />
    </>
}

export default Dashboard
