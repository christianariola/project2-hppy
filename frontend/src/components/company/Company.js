import { useState, useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompanyList } from "../../features/company/companySlice"

const Company = () => {

    const dispatch = useDispatch()

    const { companyList, message } = useSelector(state => state.company)

    useEffect(() => {
        dispatch(getCompanyList())
    }, [dispatch])
    
    const results = [];

    if(typeof companyList.data === 'undefined'){
    } else {
        {companyList.data.map((company)=>
            <table>
                {results.push(
                    <tr key={company._id}>
                    <td>{company.name}</td>
                    <td>{company.description}</td>
                    <td>
                        <Link component={RouterLink} to={`/app/company/${company._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>View</Link>
                        <Link component={RouterLink} to='/app/companies' variant="button" sx={{ my: 1, mx: 1.5 }}>Edit</Link>
                        <Link component={RouterLink} to='/app/companies' variant="button" sx={{ my: 1, mx: 1.5 }}>Delete</Link>
                    </td>
                    </tr>
                )}
            </table>
        )}
    }

    console.log('List', companyList.data)
    return <>
        <h2>Company Page</h2>
        <Link component={RouterLink} to='/app/companies/add' variant="button" sx={{ my: 1, mx: 1.5 }}>New Company</Link>


        {results}
    </>
}

export default Company
