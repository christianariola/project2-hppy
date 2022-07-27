import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { getEmployee } from "../../features/company/companySlice"

const EditEmployee = () => {

    const initialState = {
        // department: '',
        role: '',
        employeeNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        job_title: '',
        // password: '',
        // confirmPassword: '',
    }

    let { companyId, empId } = useParams(); 

    const [formData, setFormData] = useState(initialState)
    const [deptData, ] = useState([])
    const [companyData, setCompanyData ] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(empId){
            dispatch(getEmployee(empId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [empId, companyId])

    // bring in pieces of state
    const { employee, isLoading, isError, isSuccess, message, companyList } = useSelector(state => state.company)

    useEffect(() => {
        if(companyId){
            const singleCompany = companyList.find((company) => company._id === companyId)
            setCompanyData({ ...singleCompany })

            if(employee){
                setFormData(employee)
            }

            // singleCompany.departments.map((item) =>
            //     deptData.push(item.deptName)
            // )
        }
    }, [companyId, companyList, deptData, employee])

    const {role, employeeNumber, firstName, lastName, email, job_title} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

    }

    const userRoles = ["Employee", "Manager", "Admin"]

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
                    <button>Save Changes</button>
                </div>
            </form>
        </section>
    </>
}

export default EditEmployee
