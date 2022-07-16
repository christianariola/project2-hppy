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

        {companyList && companyList.map((item, index) => <div key={index}>
            <h3><Link component={RouterLink} to={`/app/company/${item._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>{item.name}</Link></h3>
            <Link component={RouterLink} to={`/app/company/${item._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>Edit</Link>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>)}
    </>
}

export default Company
