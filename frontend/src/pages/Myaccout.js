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
        <h1>My Account page</h1>
        <p className="account-text">My Account informtaion is view-only. You cannot edit this informtaion.</p>
        <form>
            <ul className="profile-form">
            <li>
                <label>First Name</label>
                <div><input type="text" placeholder={employee.firstName} disabled></input></div>
            </li>
            <li>
                <label>Last Name</label>
                <div><input type="text" placeholder={employee.lastName} disabled></input></div>
            </li>
            </ul>
            <ul className="profile-form">
            <li>
                <label>Email</label>
                <div><input type="text" placeholder={employee.email} disabled></input></div>
            </li>
            <li>
                <label>Department</label>
                <div><input type="text" placeholder={employee.department} disabled></input></div>
            </li>
            </ul>
            <ul className="profile-form">
            <li>
                <label>Employee Number</label>
                <div><input type="text" disabled></input></div>
            </li>
            <li>
                <label>Job Title</label>
                <div><input type="text" placeholder={employee.role} disabled></input></div>
            </li>
            </ul>
            <button className="logoutBtn" onClick={onLogout} >Logout</button>
        </form>
    </>
}

export default MyAccount