import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const MyAccount = () => {
    const { employee } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    
    return <>
        <h2>My Account</h2>
        <p>My Account informtaion is view-only. You cannot edit this informtaion.</p>
        <form>
            <div>
            <label>First Name</label>
            <input type="text" placeholder={employee.firstName} disabled></input>
            <label>Last Name</label>
            <input type="text" placeholder={employee.lastName} disabled></input>
            </div>
            <div>
            <label>Email</label>
            <input type="text" placeholder={employee.email} disabled></input>
            <label>Department</label>
            <input type="text" placeholder={employee.department_name} disabled></input>
            </div>
            <div>
            <label>Employee Number</label>
            <input type="text" placeholder={employee.employeeNumber} disabled></input>
            <label>Job Title</label>
            <input type="text" placeholder={employee.job_title} disabled></input>
            </div>
            <button onClick={onLogout}>Logout</button>
        </form>
    </>
}

export default MyAccount