// import { useEffect } from "react"
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompany } from "../../features/company/companySlice"

const ViewCompany = () => {

    let { companyId } = useParams(); 

    const dispatch = useDispatch()

    const { company } = useSelector(state => state.company)

    dispatch(getCompany(companyId))


    return <>
        <h2>View Company</h2>
        <p>Name: {company.name}</p>
        <p>Description: {company.description}</p>

        <Link component={RouterLink} to={`/app/employee/add`} variant="button" sx={{ my: 1, mx: 1.5 }}>Add Employee</Link>
    </>
}

export default ViewCompany
