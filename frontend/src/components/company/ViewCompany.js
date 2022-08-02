import { useState, useEffect, useMemo } from "react"
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import { getCompany, deleteEmployee, getEmployeeByCompany } from "../../features/company/companySlice"
import Logo from "./Logo"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Box, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import UsersActions from "../employee/UsersActions";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const ViewCompany = () => {

    let { companyId } = useParams(); 

    const dispatch = useDispatch()
    const { company } = useSelector(state => state.company)
    const { employeeList, isLoading } = useSelector((state) => ({...state.company}))

    // const [reload, setReload] = useState(false)
    useEffect(() => {
        if(companyId){
            dispatch(getEmployeeByCompany(companyId))
            dispatch(getCompany(companyId))
            // setReload(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId])

    const handleDelete = (empId, compempId) => {
        if(window.confirm("Are you sure you want to delete this employee?")){
            dispatch(deleteEmployee({empId, compempId}))
        }

        // setReload(true)
    }

    const columns = useMemo(() => [
        {field: 'names', headerName: 'Name', type: 'names', width: 300, headerAlign: 'center', renderCell:params=><Link component={RouterLink} underline='none' to={`/app/company/${companyId}/employee/view/${params.row._id}`} variant="button" sx={{ my: 1, mx: 1.5 }}>{params.row.firstName} {params.row.lastName}</Link>},
        {field: 'department_name', headerName: 'Department', width: 200},
        {field: 'jobTitle', headerName: 'Job Title', width: 200},
        {field: 'actions', headerName: 'Actions', type: 'actions', width: 200, renderCell:params=><UsersActions {...params} />}
    ], [])

    console.log(employeeList)
    return <>
        <h2>View Company</h2>

        <section>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '2rem'}}>
            <Link underline="hover" component={RouterLink} to={`/app/companies`}>
                Companies
            </Link>
            <Typography>
                View Company
            </Typography>
        </Breadcrumbs>
        </section>

        <Grid container spacing={2} sx={{mt: '1rem', display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} md={3}>
                <Logo logo={company.logo} />
            </Grid>
            <Grid item xs={12} md={9}>
                <Typography variant="h6" gutterBottom component="div">
                Name: {company.name}
                </Typography>

                <Typography>
                Description: {company.description}
                </Typography>
            </Grid>
        </Grid>


        <Grid container sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid item><h2>Employees</h2></Grid>
            <Grid item>
                <Link component={RouterLink} to={`/app/company/${companyId}/employee/add`} underline='none'>
                    <Button variant="contained" sx={{backgroundColor: '#003D66'}}><AddIcon sx={{ mr:'0.5rem'}} /> New Employee</Button>
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
            rows={employeeList}
            getRowId={row=>row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowSpacing={params=>({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5 
            })}
            />
        </Box>



        {/* <ul>
        {company.departments && company.departments.map((item, index) => <div key={index}>
            <li>{item.deptName}
            <ul>
            {item.employees.map((employee, index) => 
                <li key={index}>
                    <Link component={RouterLink} to={`/app/company/${companyId}/employee/view/${employee.employee_id}`}>{employee.firstName} {employee.lastName}</Link>
                    <Link component={RouterLink} to={`/app/company/${companyId}/employee/edit/${employee.employee_id}`} sx={{ my: 1, mx: 1.5 }}>Edit</Link>
                    <button onClick={() => handleDelete(employee.employee_id, employee._id)}>Delete</button>
                </li>
            )}
            </ul>
            </li>
        </div>)}
        </ul>

        <Link component={RouterLink} to={`/app/company/${companyId}/employee/add`} variant="button" sx={{ my: 1, mx: 1.5 }}>Add Employee</Link> */}

        
    </>
}

export default ViewCompany
