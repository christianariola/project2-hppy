import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { deleteCompany } from "../../features/company/companySlice"
import { useDispatch } from 'react-redux'

const UsersActions = (params) => {

    const dispatch = useDispatch()
    
    const handleDelete = (companyId) => {
        if(window.confirm("Are you sure you want to delete this company?")){
            // console.log(companyId)
            dispatch(deleteCompany(companyId))
        }
    }

    // console.log(params)
    return (
    <div>
    <Link component={RouterLink} to={`/app/company/${params.row._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>
    <IconButton aria-label="view">
        <VisibilityIcon />
    </IconButton>
    </Link>

    <Link component={RouterLink} to={`/app/company/edit/${params.row._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>
    <IconButton aria-label="edit">
        <ModeEditIcon />
    </IconButton>
    </Link>

    <IconButton aria-label="delete" onClick={event => handleDelete(params.row._id)}>
        <DeleteIcon />
    </IconButton>
    </div>
    )
}

export default UsersActions
