import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
// useSelector to select from global states like employee, etc
// useDispatch to dispatch actions like addEmployee, etc
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from "../features/auth/authSlice"

import Footer from '../components/Footer'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme();

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    // dispatch.addEmployee
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || "/app/dashboard"

    // bring in pieces of state
    const { employee, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)
    

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        // Redirect if logged in
        if(isSuccess || employee){
            navigate(from, { replace: true })
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

        const employeeData = {
            email,
            password
        }

        dispatch(login(employeeData))
    }

    return <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(./images/login-side.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Link component={RouterLink} to='/'>
              <img src="./images/hppy-logo.svg" alt="Hppy" />
            </Link>

            <Typography mt={2} component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
                />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </ThemeProvider>


    </>
}

export default Login
