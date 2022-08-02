import { useState, useEffect } from "react"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompany, deleteEmployee } from "../../features/company/companySlice"
// import Logo from "../../components/company/Logo"


const Department = () => {

    const { employee } = useSelector(state => state.auth)
    let companyId = employee.company_id; 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { company } = useSelector(state => state.company)
    const [reload, setReload] = useState(false)
    useEffect(() => {
        if(companyId){
            dispatch(getCompany(companyId))
            setReload(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId, reload])

    const handleDelete = (empId, compempId) => {
        if(window.confirm("Are you sure you want to delete this employee?")){
            dispatch(deleteEmployee({empId, compempId}))
        }

        navigate(`/app/company/departments`)
        setReload(true)
    }

    return <>
        <h2>Department List</h2>
        <ul>
        {company.departments && company.departments.map((item, index) => <div key={index}>
            <li>{item.deptName}
            <ul>
            {item.employees.map((emplo, index) => 

                <li key={index}>{emplo.email !== employee.email ? "" : ""}
                    {emplo.email !== employee.email ? <Link component={RouterLink} to={`/app/company/${companyId}/employee/view/${emplo.employee_id}`}>{emplo.firstName} {emplo.lastName}</Link> : ''}
                    {emplo.email !== employee.email ? <Link component={RouterLink} to={`/app/company/${companyId}/employee/edit/${emplo.employee_id}`} sx={{ my: 1, mx: 1.5 }}>Edit</Link> : ''}
                    {emplo.email !== employee.email ? <button onClick={() => handleDelete(emplo.employee_id, emplo._id)}>Delete</button> : ''}
                </li>
            )}
            </ul>
            </li>
        </div>)}
        </ul>

        <Link component={RouterLink} to={`/app/company/${companyId}/employee/add`} variant="button" sx={{ my: 1, mx: 1.5 }}>Add Employee</Link>
    </>
}

export default Department
