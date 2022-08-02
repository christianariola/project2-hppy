import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { getEmployee, updateEmployee, getCompany } from "../../features/company/companySlice"

const EditEmployee = () => {

    const initialState = {
        role: '',
        department_name: '',
        employeeNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        job_title: '',
        password: '',
        confirmPassword: '',
    }

    let { companyId, empId } = useParams(); 

    const [formData, setFormData] = useState(initialState)
    const [, setCompanyData ] = useState([])

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        if(empId){
            dispatch(getEmployee(empId))
            dispatch(getCompany(companyId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [empId, companyId])

    // bring in pieces of state
    const { employee, company, isLoading } = useSelector(state => state.company)

    useEffect(() => {

        if(employee){
            setFormData(employee)
        }

        setCompanyData(company)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId, employee])

    const {role, department_name, employeeNumber, firstName, lastName, email, job_title, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const getDeptID = company?.departments?.find((dept) => dept.deptName === department_name)

        if(password){
            const updatedEmployeeData = {
                department_id: getDeptID._id,
                department_name,
                employeeNumber,
                firstName,
                lastName,
                email,
                job_title,
                password,
                role
            }

            dispatch(updateEmployee({updatedEmployeeData, empId}))
        } else {
            const updatedEmployeeData = {
                department_id: getDeptID._id,
                department_name,
                employeeNumber,
                firstName,
                lastName,
                email,
                job_title,
                role
            }

            dispatch(updateEmployee({updatedEmployeeData, empId}))
        }
    }

    if(company){
        // let employeeDoc
        for (var i = 0, l = company.departments.length; i < l; i++) {
            var departments = company.departments[i];
    
            for (var j = 0, h = departments.employees.length; j < h; j++) {
                var isAdmin = departments.employees[j].isAdmin;
                // var isManager = departments.employees[j].isManager;
    
            }
 
            console.log(isAdmin)
            // employees.find((admin) => admin.isAdmin === true)
    
        }
    }

    if(isLoading) {
        return "Loading... please wait."
    }

    let userRoles = ["Employee", "Manager", "Admin"]
    if(isAdmin){
        userRoles = ["Employee", "Manager"]
    } 

    return <>
        <section>
            <h1>Edit Employee</h1>
        </section>

        <section>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="role">User Role:</label>
                    <select id="role" name="role" value={role.charAt(0).toUpperCase() + role.slice(1)} onChange={onChange} required>
                        <option value="">Select role</option>
                        { userRoles.map((item, index, role) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <select id="department" name="department" value={department_name} onChange={onChange}>
                        {company?.departments && company?.departments.map((item, index) => <option key={index} value={item.deptName}>{item.deptName}</option>)}
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
                    <label htmlFor="job_title">Job Title:</label>
                    <input type="text" className="form-control" id="job_title" name="job_title" value={job_title} onChange={onChange} placeholder="Enter employee job title" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Enter your password" />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} placeholder="Confirm your password" />
                </div>

                <div className="form-group">
                    <button>Save Changes</button>
                </div>
            </form>
        </section>
    </>
}

export default EditEmployee
