import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { employee } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to="/">Hppy.</Link>
            </div>
            <ul>
                {employee ? (
                    <>
                    <li>Profile
                    <ul>
                        <p>Welcome {employee.firstName}!</p>
                        <li><Link to="/myaccount">My Account</Link></li>
                        <li><button onClick={onLogout}>Logout</button></li>
                    </ul>
                    </li>
                    <li>Notification</li>
                    <li><Link to="/dashboard">My Dashboard</Link></li>
                    <li><Link to="/employee/add">Add Employee</Link></li>
                    </>
                ) : (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header