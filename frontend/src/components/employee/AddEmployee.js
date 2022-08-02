import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
// useSelector to select from global states like employee, etc
// useDispatch to dispatch actions like addEmployee, etc
import { useSelector, useDispatch } from 'react-redux'
import { addEmployee, reset } from "../../features/auth/authSlice"
import { getCompany } from "../../features/company/companySlice"

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import { Grid } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Register = () => {

    let { companyId } = useParams(); 

    const { company } = useSelector(state => state.company)

    useEffect(() => {
        dispatch(getCompany(companyId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [formData, setFormData] = useState({
        // department: '',
        // role: '',
        employeeNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        password: '',
        // confirmPassword: '',
        showPassword: false,
    })
    const [selectedRole, setRole] = useState('');
    const [selectedDept, setDepartment] = useState('');

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleChangeDept = (event) => {
        setDepartment(event.target.value);
    };

    const {employeeNumber, firstName, lastName, email, jobTitle, password} = formData

    // dispatch.addEmployee
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // bring in pieces of state
    const { employee, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        // Redirect if logged in
        // if(isSuccess || employee){
        if(isSuccess){
            console.log("Employee added!")
            toast.success("New employee added.")
            if(employee.role.toLowerCase() === 'superadmin'){
                navigate(`/app/company/${companyId}`)
            } else {
                navigate(`/app/company/departments`)
            }


        }

        dispatch(reset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, isLoading, employee, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const getDeptID = company?.departments?.find((dept) => dept.deptName === selectedDept)

        const employeeData = {
            company_id: companyId,
            company_name: company.name,
            department_id: getDeptID._id,
            department_name: selectedDept,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
            password,
            role: selectedRole,
        }

        dispatch(addEmployee(employeeData))
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
            <h2>Add Employee</h2>
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
                Add Employee
            </Typography>
        </Breadcrumbs>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                {/* <div className="form-group">
                    <label htmlFor="role">User Role:</label>
                    <select id="role" name="role" value={role} onChange={onChange} required>
                        <option value="">Select role</option>
                        { userRoles.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div> */}

                <FormControl fullWidth sx={{mb:2}}>
                <InputLabel id="demo-simple-select-label">User Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedRole}
                    label="role"
                    onChange={handleChangeRole}
                >
                    { userRoles.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
                </FormControl>


                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDept}
                    label="department"
                    onChange={handleChangeDept}
                >
                    { company.departments && company.departments.map((item, index) => <MenuItem key={index} value={item.deptName}>{item.deptName}</MenuItem>)}
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
                </FormControl>

                <TextField
                margin="normal"
                required
                fullWidth
                id="employeeNumber"
                label="Employee #"
                name="employeeNumber"
                autoComplete="employeeNumber"
                autoFocus
                value={employeeNumber} 
                onChange={onChange}
                />

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
                value={jobTitle} 
                onChange={onChange}
                />

              <FormControl fullWidth variant="outlined" sx={{mb: 3, mt: 2}}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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

              {/* <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-password-input"
                  type={formData.showPassword ? 'text' : 'confirmPassword'}
                  value={formData.confirmPassword}
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
                  label="confirmPassword"
                  name="confirmPassword"
                  required
                />
              </FormControl> */}

                {/* <div className="form-group">
                    <label htmlFor="employeeNumber">Employee #:</label>
                    <input type="text" className="form-control" id="employeeNumber" name="employeeNumber" value={employeeNumber} onChange={onChange} placeholder="Enter employee #" />
                </div> */}
                {/* <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={onChange} placeholder="Enter employee first name" />
                </div> */}

                {/* <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} onChange={onChange} placeholder="Enter employee last name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Enter employee email address" />
                </div> */}
{/* 
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title:</label>
                    <input type="text" className="form-control" id="jobTitle" name="jobTitle" value={jobTitle} onChange={onChange} placeholder="Enter employee job title" />
                </div> */}
{/* 
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Enter your password" />
                </div> */}

                {/* <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm your password" />
                </div> */}
{/* 
                <div className="form-group">
                    <button>Submit</button>
                </div> */}

                <Grid container spacing={2} sx={{mt: '1rem', }}>
                    <Grid item xs={12} md={6}>
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: '#336485', fontSize: '1.2rem', fontWeight: 'bold'}}
                        size="large"
                        fullWidth
                        >
                        Add
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Link component={RouterLink} to={`/app/company/${companyId}`} underline='none'>
                            <Button
                            variant="outlined"
                            sx={{fontSize: '1.2rem', color: '#336485', borderColor: '#336485', fontWeight: 'bold'}}
                            size="large"
                            fullWidth
                            >
                                Cancel
                            </Button>     
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </section>
    </>
}

export default Register
