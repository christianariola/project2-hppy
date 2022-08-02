import { useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompanyList, deleteCompany } from "../../features/company/companySlice"

const Company = () => {

    const dispatch = useDispatch()
    
    const { companyList, isLoading } = useSelector((state) => ({...state.company}))

    useEffect(() => {
        dispatch(getCompanyList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    if(isLoading){
        return <h2>Loading...</h2>
    }

    const handleDelete = (companyId) => {
        if(window.confirm("Are you sure you want to delete this company?")){
            dispatch(deleteCompany(companyId))
        }
    }

    return <>
        <h2>Company Page</h2>
        <Link component={RouterLink} to='/app/companies/add' variant="button" sx={{ my: 1, mx: 1.5 }}>Add Company</Link>

        {companyList.length === 0 && (
            <h2>No Companies Found</h2>
        )}


        <table>
            <thead>
            <tr className="report-list">
                <th>Name</th>
                <th>Desc</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {companyList && companyList.map((item, index) => <tr className="report-content">
                    <td><Link component={RouterLink} to={`/app/company/${item._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>{item.name}</Link></td>
                    <td>{item.description}</td>
                    <td>
                    <Link component={RouterLink} to={`/app/company/edit/${item._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>Edit</Link>
                    <Link onClick={() => handleDelete(item._id)} variant="button" sx={{ my: 1, mx: 1.5 }}>Delete</Link>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </>
}

export default Company
