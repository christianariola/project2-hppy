import { useState } from "react"
// useSelector to select from global states like employee, etc
// useDispatch to dispatch actions like addEmployee, etc
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../features/auth/authSlice"

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    // dispatch.addEmployee
    const dispatch = useDispatch()

    // bring in pieces of state
    const { employee, isLoading, isSuccess, message } = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const employeeData = {
            email,
            password
        }

        dispatch(login(employeeData))
    }

    return <>
        <section>
            <h1>Login</h1>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Enter employee email address" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Enter your password" />
                </div>
                
                <div className="form-group">
                    <button>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Login
