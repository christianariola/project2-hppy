import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Company = () => {
    return <>
        <h2>Company Page</h2>
        <Link component={RouterLink} to='/app/companies/add' variant="button" sx={{ my: 1, mx: 1.5 }}>New Company</Link>
    </>
}

export default Company
