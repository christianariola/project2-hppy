import { useState } from "react"
// useSelector to select from global states like employee, etc
// useDispatch to dispatch actions like addEmployee, etc
import { useSelector, useDispatch } from 'react-redux'
import { addEmployee } from "../features/auth/authSlice"

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const {firstName, lastName, email, password, confirmPassword} = formData

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
            firstName,
            lastName,
            email,
            password
        }

        dispatch(addEmployee(employeeData))
    }

    return <>
        <section>
            <h1>Add Employee { employee }</h1>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={onChange} placeholder="Enter employee first name" />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} onChange={onChange} placeholder="Enter employee last name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Enter employee email address" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Enter your password" />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm your password" />
                </div>

                <div className="form-group">
                    <button>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Register
