import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

// MUI imports
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';


const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { employee } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return <>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    <img src="/images/hppy-logo.svg" alt="Hppy" />
                </Typography>
                <nav>
                <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    underline="none"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Features
                </Link>
                <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    underline="none"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Pricing
                </Link>
                <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    underline="none"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    About
                </Link>
                <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    underline="none"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Contact
                </Link>
                </nav>
                <Button href="/login" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                Login
                </Button>
            </Toolbar>
        </AppBar>
    </>
}

export default Header