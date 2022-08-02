import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changePassword, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField'
// import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import { Grid } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const ChangePassword = () => {

    const { employee, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const initialState = {
        email: employee.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { email, currentPassword, newPassword, confirmPassword } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        if(isSuccess){
            navigate('/app/account')
        }

        dispatch(reset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, isLoading, message, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        if(email) {
            dispatch(changePassword(formData))
        }
    }

    return <>
        <section>
            <h2>Change Password</h2>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                {/* <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input type="password" className="form-control" id="currentPassword" name="currentPassword" value={currentPassword} onChange={onChange} placeholder="Current password" required/>
                </div> */}

                <TextField
                margin="normal"
                required
                fullWidth
                id="currentPassword"
                label="Current Password"
                name="currentPassword"
                autoComplete="currentPassword"
                autoFocus
                value={currentPassword} 
                onChange={onChange}
                type="password"
                />

                <TextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
                autoComplete="newPassword"
                autoFocus
                value={newPassword} 
                onChange={onChange}
                type="password"
                />

                <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                autoFocus
                value={confirmPassword} 
                onChange={onChange}
                type="password"
                />

                {/* <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" className="form-control" id="newPassword" name="newPassword" value={newPassword} onChange={onChange} placeholder="New password" required/>
                </div> */}

                {/* <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm password" required/>
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
                        Change Password
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Link component={RouterLink} to={`/app/dashboard`} underline='none'>
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
{/* 
                <div className="form-group">
                    <button>Change Password</button>
                </div> */}
            </form>
        </section>
    </>
}

export default ChangePassword
