import { useState, useEffect } from "react"
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompany, deleteEmployee } from "../../features/company/companySlice"
import Logo from "./Logo"
import Breadcrumbs from '@mui/material/Breadcrumbs';


const ViewCompany = () => {

    let { companyId } = useParams(); 

    const dispatch = useDispatch()
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

        setReload(true)
    }


    // console.log(company)
    return <>
        <h2>View Company</h2>
        <Logo logo={company.logo} />
        <p>Name: {company.name}</p>
        <p>Description: {company.description}</p>

        <p>Departments</p>
        <ul>
        {company.departments && company.departments.map((item, index) => <div key={index}>
            <li>{item.deptName}
            <ul>
            {item.employees.map((employee, index) => 
                <li key={index}>
                    <Link component={RouterLink} to={`/app/company/${companyId}/employee/view/${employee.employee_id}`}>{employee.firstName} {employee.lastName}</Link>
                    <Link component={RouterLink} to={`/app/company/${companyId}/employee/edit/${employee.employee_id}`} sx={{ my: 1, mx: 1.5 }}>Edit</Link>
                    <button onClick={() => handleDelete(employee.employee_id, employee._id)}>Delete</button>
                </li>
            )}
            </ul>
            </li>
        </div>)}
        </ul>

        <Link component={RouterLink} to={`/app/company/${companyId}/employee/add`} variant="button" sx={{ my: 1, mx: 1.5 }}>Add Employee</Link>

        
    </>
}

export default ViewCompany
