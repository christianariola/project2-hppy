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
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from "react-hook-form"

const theme = createTheme({
  typography: {
    fontFamily: 'Titillium Web, Arial, Tahoma, Helvetica, sans-serif',
  },
});

const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({})

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    // const {email, password, showPassword} = formData

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

    if(isSuccess){
      toast.success("You have successfully logged in.")
    }

    if(isError){
      toast.error(message)
    }

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

    const onSubmit = (data) => {
        // e.preventDefault()

        const employeeData = {
            email: data.email,
            password: data.password
        }

        dispatch(login(employeeData))
    }


    const ColorButton = styled(Button)(({ theme }) => ({
      color: "#FFFFFF",
      backgroundColor: "#336485",
      '&:hover': {
        backgroundColor: "#5787A8",
      },
    }));

    if(isLoading){
      console.log('loading')
    } else {
      console.log('not loading')
    }

    return <>
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: '85vh', display: 'flex', }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(./images/login-side.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: '200px'
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '399px'
            }}
          >
            <Link component={RouterLink} to='/'>
              <img src="./images/hppy-logo.svg" alt="Hppy" />
            </Link>

            <Typography mt={2} component="h1" variant="h4" style={{ fontWeight: "bold" }} >
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                // value={email} 
                onChange={onChange}
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email address"
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                />

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" error={!!errors?.password}>Password</InputLabel>
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

                  {...register("password", {
                    required: "Required",
                  })}
                  error={!!errors?.password}
                  // helperText={errors?.password ? errors.password.message : null}
                />
                {errors?.password ? <FormHelperText error>{errors.password.message}</FormHelperText> : null}
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ColorButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                Sign In
              </ColorButton>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>


      </Grid>


    </ThemeProvider>
    <Footer />

    </>
}

export default Login
