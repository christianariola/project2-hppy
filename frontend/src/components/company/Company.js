import { useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux'
import { getCompanyList } from "../../features/company/companySlice"
import axios from 'axios'

const Company = () => {

    // Local API_URL for dev
    const API_URL = '/api/companies' 
    // const API_URL = 'https://pluto-hppy.herokuapp.com/api/companies'

    const { companyList } = useSelector(state => state.company)

    if(typeof companyList.data === 'undefined'){
        console.log('true')
    } else {
        console.log('false')
    }

    useEffect(() => {
        axios.post(API_URL + '/list').then((response)=>{
            console.log(response)
        })
    }, [])
    

    // console.log(companyList)

    if(typeof companyList.data === 'undefined'){
    } else {
        // {companyList.data.map((company)=>
        //     <table>
        //         {results.push(
        //             <tr key={company._id}>
        //             <td>{company.name}</td>
        //             <td>{company.description}</td>
        //             <td>
        //                 <Link component={RouterLink} to={`/app/company/${company._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>View</Link>
        //                 <Link component={RouterLink} to='/app/companies' variant="button" sx={{ my: 1, mx: 1.5 }}>Edit</Link>
        //                 <Link component={RouterLink} to='/app/companies' variant="button" sx={{ my: 1, mx: 1.5 }}>Delete</Link>
        //             </td>
        //             </tr>
        //         )}
        //     </table>
        // )}
    }

    return <>
        <h2>Company Page</h2>
        <Link component={RouterLink} to='/app/companies/add' variant="button" sx={{ my: 1, mx: 1.5 }}>New Company</Link>


        {/* {results} */}
    </>
}

export default Company
