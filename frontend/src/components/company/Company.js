import { useEffect, useMemo } from "react"
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompanyList } from "../../features/company/companySlice"

import { Box, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import UsersActions from "./UsersActions";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const Company = () => {

    const dispatch = useDispatch()

    const { companyList, isLoading } = useSelector((state) => ({...state.company}))

    const columns = useMemo(() => [
        {field: 'name', headerName: 'Name', width: 300, headerAlign: 'center', renderCell:params=><Link component={RouterLink} underline='none' to={`/app/company/${params.row._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>{params.row.name}</Link>},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'createdAt', headerName: 'Date Created', width: 200, renderCell: params=>moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')},
        {field: 'actions', headerName: 'Actions', type: 'actions', width: 200, renderCell:params=><UsersActions {...params} />}
    ], [])
    

    useEffect(() => {
        dispatch(getCompanyList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    if(isLoading){
        return <h2>Loading...</h2>
    }


    console.log(companyList)



    return <>
        <Grid container sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid item><h2>Companies</h2></Grid>
            <Grid item>
                <Link component={RouterLink} to={`/app/companies/add`} underline='none'>
                    <Button variant="contained" sx={{backgroundColor: '#003D66'}}><AddIcon sx={{ mr:'0.5rem'}} /> New Company</Button>
                </Link>
            </Grid>
        </Grid>


        <Box
        sx={{
            height: 430,
            width: '100%'
        }}
        >
            {/* <Typography
            variant="h3"
            component="h3"
            sx={{textAlign:'center', mt: 3, mb: 3}}
            >
                Manage Company
            </Typography> */}
            <DataGrid 
            columns={columns}
            rows={companyList}
            getRowId={row=>row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowSpacing={params=>({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5 
            })}
            />
        </Box>
    </>
}

export default Company
