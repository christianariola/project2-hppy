import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
// useSelector to select from global states like employee, etc
// useDispatch to dispatch actions like addEmployee, etc
import { useSelector, useDispatch } from 'react-redux'
import { addEmployee, reset } from "../../features/auth/authSlice"
import { getCompany } from "../../features/company/companySlice"

const Register = () => {

    let { companyId } = useParams(); 

    const { company } = useSelector(state => state.company)

    useEffect(() => {
        dispatch(getCompany(companyId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [formData, setFormData] = useState({
        department: '',
        role: '',
        employeeNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        password: '',
        confirmPassword: '',
    })

    const {department, role, employeeNumber, firstName, lastName, email, jobTitle, password, confirmPassword} = formData

    // dispatch.addEmployee
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // bring in pieces of state
    const { employee, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        // Redirect if logged in
        // if(isSuccess || employee){
        if(isSuccess){
            console.log("Employee added!")
            navigate(`/app/company/${companyId}`)
        }

        dispatch(reset())
    }, [isError, isSuccess, isLoading, employee, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const getDeptID = company?.departments?.find((dept) => dept.deptName === department)

        const employeeData = {
            company_id: companyId,
            company_name: company.name,
            department_id: getDeptID._id,
            department_name: department,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
            password,
            role
        }

        dispatch(addEmployee(employeeData))
    }

    if(isLoading) {
        return "Loading... please wait."
    }

    const userRoles = ["Employee", "Manager"]

    return <>
        <section>
            <h1>Add Employee</h1>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <select id="department" name="department" value={department} onChange={onChange}>
                        {company.departments && company.departments.map((item, index) => <option key={index} value={item.deptName}>{item.deptName}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="role">User Role:</label>
                    <select id="role" name="role" value={role} onChange={onChange} required>
                        <option value="">Select role</option>
                        { userRoles.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="employeeNumber">Employee #:</label>
                    <input type="text" className="form-control" id="employeeNumber" name="employeeNumber" value={employeeNumber} onChange={onChange} placeholder="Enter employee #" />
                </div>
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
                    <label htmlFor="jobTitle">Job Title:</label>
                    <input type="text" className="form-control" id="jobTitle" name="jobTitle" value={jobTitle} onChange={onChange} placeholder="Enter employee job title" />
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
