import { useSelector } from 'react-redux'

const Dashboard = () => {

    // bring in employee state from redux store
    const { employee } = useSelector(state => state.auth)

    return <>
        <h1>Dashboard</h1>
        <p>Welcome, {employee.firstName}</p>
        <p>Role: {employee.role}</p>
    </>
}

export default Dashboard
