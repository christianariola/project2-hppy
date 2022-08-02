import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { getEmployee, updateEmployee, getCompany } from "../../features/company/companySlice"

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField'
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import { Grid } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

const EditEmployee = () => {

    const initialState = {
        role: '',
        department_name: '',
        employeeNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        job_title: '',
        password: '',
        confirmPassword: '',
    }

    let { companyId, empId } = useParams(); 

    const [formData, setFormData] = useState(initialState)
    const [, setCompanyData ] = useState([])

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        if(empId){
            dispatch(getEmployee(empId))
            dispatch(getCompany(companyId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [empId, companyId])

    // bring in pieces of state
    const { employee, company, isLoading } = useSelector(state => state.company)

    useEffect(() => {

        if(employee){
            setFormData(employee)
        }

        setCompanyData(company)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId, employee])

    const {role, department_name, employeeNumber, firstName, lastName, email, job_title, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClickShowPassword = () => {
      setFormData({
        ...formData,
        showPassword: !formData.showPassword,
      });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const onSubmit = (e) => {
        e.preventDefault()

        const getDeptID = company?.departments?.find((dept) => dept.deptName === department_name)

        if(password){
            const updatedEmployeeData = {
                department_id: getDeptID._id,
                department_name,
                employeeNumber,
                firstName,
                lastName,
                email,
                job_title,
                password,
                role
            }

            dispatch(updateEmployee({updatedEmployeeData, empId}))
        } else {
            const updatedEmployeeData = {
                department_id: getDeptID._id,
                department_name,
                employeeNumber,
                firstName,
                lastName,
                email,
                job_title,
                role
            }

            dispatch(updateEmployee({updatedEmployeeData, empId}))
        }
    }

    if(company){
        // let employeeDoc
        for (var i = 0, l = company.departments.length; i < l; i++) {
            var departments = company.departments[i];
    
            for (var j = 0, h = departments.employees.length; j < h; j++) {
                var isAdmin = departments.employees[j].isAdmin;
                // var isManager = departments.employees[j].isManager;
    
            }
 
            console.log(isAdmin)
            // employees.find((admin) => admin.isAdmin === true)
    
        }
    }

    if(isLoading) {
        return "Loading... please wait."
    }

    let userRoles = ["Employee", "Manager", "Admin"]
    if(isAdmin){
        userRoles = ["Employee", "Manager"]
    } 

    return <>
        <section>
            <h2>Edit Employee</h2>
        </section>

        <section>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '2rem'}}>
            <Link underline="hover" component={RouterLink} to={`/app/companies`}>
                Companies
            </Link>
            <Link underline="hover" component={RouterLink} to={`/app/company/${companyId}`}>
                View Company
            </Link>
            <Typography>
                Edit Employee
            </Typography>
        </Breadcrumbs>
        </section>

        <section>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="role">User Role:</label>
                    <select id="role" name="role" value={role.charAt(0).toUpperCase() + role.slice(1)} onChange={onChange} required>
                        <option value="">Select role</option>
                        { userRoles.map((item, index, role) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <select id="department" name="department" value={department_name} onChange={onChange}>
                        {company?.departments && company?.departments.map((item, index) => <option key={index} value={item.deptName}>{item.deptName}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="employeeNumber">Employee #:</label>
                    <input type="text" className="form-control" id="employeeNumber" name="employeeNumber" value={employeeNumber} onChange={onChange} placeholder="Enter employee #" />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={onChange} placeholder="Enter employee first name" />
                </div> */}
                <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={firstName} 
                onChange={onChange}
                />

                <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                value={lastName} 
                onChange={onChange}
                />

                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email} 
                onChange={onChange}
                />

                <TextField
                margin="normal"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                name="jobTitle"
                autoComplete="jobTitle"
                autoFocus
                value={job_title} 
                onChange={onChange}
                />

              <FormControl fullWidth variant="outlined" sx={{mb: 3, mt: 2}}>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={formData.showPassword ? 'text' : 'password'}
                  // value={formData.password}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  required
                />
              </FormControl>
                {/* <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} onChange={onChange} placeholder="Enter employee last name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Enter employee email address" />
                </div> */}

                {/* <div className="form-group">
                    <label htmlFor="job_title">Job Title:</label>
                    <input type="text" className="form-control" id="job_title" name="job_title" value={job_title} onChange={onChange} placeholder="Enter employee job title" />
                </div> */}

                {/* <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Enter your password" />
                </div> */}

                <TextField
                margin="normal"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                name="jobTitle"
                autoComplete="jobTitle"
                autoFocus
                value={job_title} 
                onChange={onChange}
                />

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} placeholder="Confirm your password" />
                </div>

                <div className="form-group">
                    <button>Save Changes</button>
                </div>
            </form>
        </section>
    </>
}

export default EditEmployee
