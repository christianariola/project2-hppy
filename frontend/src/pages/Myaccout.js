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
        <h1>My Account</h1>
        <div className="account-page">
        <p className="account-des">My Account informtaion is view-only. You cannot edit this informtaion.</p>
        <form className="account-form">
            <ul className="form-wrap">
                <li className="input-area">
                    <ul>
                        <li><label>First Name</label></li>
                        <li><input type="text" placeholder={employee.firstName} disabled></input></li>
                    </ul>
                </li>
                <li className="input-area">
                    <ul>
                        <li> <label>Last Name</label></li>
                        <li><input type="text" placeholder={employee.lastName} disabled></input></li>
                    </ul>
                </li>
            
                <li className="input-area">
                    <ul>
                        <li><label>Email</label></li>
                        <li><input type="text" placeholder={employee.email} disabled></input></li>
                    </ul>
                </li>
            
            
                <li className="input-area">
                    <ul>
                        <li><label>Department</label></li>
                        <li><input type="text" disabled></input></li>
                    </ul>
                </li>
           
          
                <li className="input-area">
                    <ul>
                        <li><label>Employee Number</label></li>
                        <li><input type="text" disabled></input></li>
                    </ul>
                </li>
           
         
                <li className="input-area">
                    <ul>
                        <li><label>Job Title</label></li>
                        <li><input type="text" disabled></input></li>
                    </ul>
                </li>
            </ul>
            
            
            
            <button className="logout-btn" onClick={onLogout}>Logout</button>
        </form>
        </div>
    </>
}

export default MyAccount