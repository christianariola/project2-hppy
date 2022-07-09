import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// import { useSelector } from 'react-redux'

const mdTheme = createTheme();

const Dashboard = () => {

    // const { employee } = useSelector((state) => state.auth)
    
    return <>

    <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
            {/* Normalize Styles */}
            <CssBaseline />

            {/* Drawer and Navbar */}
            <DashboardNavbar />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                }}
            >
                <Toolbar />

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Content */}
                    <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Outlet />
                    </Paper>
                    </Grid>
                </Grid>
                </Container>

            </Box>
        </Box>

        {/* Footer */}
        {/* <DashboardFooter /> */}

    </ThemeProvider>
    </>
}

export default Dashboard
