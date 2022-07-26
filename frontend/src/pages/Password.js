import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changePassword, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {

    const { employee, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const initialState = {
        email: employee.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { email, currentPassword, newPassword, confirmPassword } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        if(isSuccess){
            navigate('/app/account')
        }

        dispatch(reset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, isLoading, message, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        if(email) {
            dispatch(changePassword(formData))
        }
    }

    return <>
        <h2>Change Password</h2>

        <section>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input type="password" className="form-control" id="currentPassword" name="currentPassword" value={currentPassword} onChange={onChange} placeholder="Current password" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" className="form-control" id="newPassword" name="newPassword" value={newPassword} onChange={onChange} placeholder="New password" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm password" required/>
                </div>

                <div className="form-group">
                    <button>Change Password</button>
                </div>
            </form>
        </section>
    </>
}

export default ChangePassword
