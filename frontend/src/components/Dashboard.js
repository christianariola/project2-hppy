import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'

const Dashboard = () => {

    return <>
        <DashboardHeader />
        <Outlet />
        <DashboardFooter />
    </>
}

export default Dashboard
