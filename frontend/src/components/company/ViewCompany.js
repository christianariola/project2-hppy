import { useEffect } from "react"
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompany } from "../../features/company/companySlice"
import Logo from "./Logo"


const ViewCompany = () => {

    let { companyId } = useParams(); 

    const dispatch = useDispatch()

    const { company } = useSelector(state => state.company)

    useEffect(() => {
        if(companyId){
            dispatch(getCompany(companyId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId])

    console.log(company)
    return <>
        <h2>View Company</h2>
        <Logo logo={company.logo} />
        <p>Name: {company.name}</p>
        <p>Description: {company.description}</p>

        <p>Departments</p>
        <ul>
        {company.departments && company.departments.map((item, index) => <div key={index}>
            <li>{item.deptName}</li><Link component={RouterLink} to={`/app/company/${item._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>View</Link>
        </div>)}
        </ul>

        <p>Employees</p>
        <ul>
        {company.departments && company.departments.map((item, index) => <div key={index}>  
            {item.employees.map((employee, index) => 
                <li key={index}>{employee.firstName} {employee.lastName}</li>
            )}
        </div>)}
        </ul>
        <Link component={RouterLink} to={`/app/company/${companyId}/employee/add`} variant="button" sx={{ my: 1, mx: 1.5 }}>Add Employee</Link>

        
    </>
}

export default ViewCompany
