import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { deleteEmployee } from "../../features/company/companySlice"
import { useSelector, useDispatch } from 'react-redux'

const UsersActions = (params) => {

    const dispatch = useDispatch()

    const handleDelete = (empId, compempId) => {
        if(window.confirm("Are you sure you want to delete this employee?")){
            dispatch(deleteEmployee({empId, compempId}))
        }

        // setReload(true)
    }

    console.log(params)
    return (
    <div>
    <Link component={RouterLink} to={`/app/company/${params.row.company_id}/employee/view/${params.row._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>
    <IconButton aria-label="view">
        <VisibilityIcon />
    </IconButton>
    </Link>

    <Link component={RouterLink} to={`/app/company/${params.row.company_id}/employee/edit/${params.row._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>
    <IconButton aria-label="edit">
        <ModeEditIcon />
    </IconButton>
    </Link>

    <IconButton aria-label="delete" onClick={event => handleDelete(params.row._id, params.row.company_id)}>
        <DeleteIcon />
    </IconButton>
    </div>
    )
}

export default UsersActions
