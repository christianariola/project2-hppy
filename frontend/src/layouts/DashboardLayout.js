import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Navigator from './Navigator';
// import Content from './Content';
import Header from './Header';
import Paper from '@mui/material/Paper';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            &copy; {new Date().getFullYear()} Hppy | Team Pluto, WMDD 4980
        </Typography>
    );
}

let theme = createTheme({
    
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
        fontFamily: '"Titillium Web", Arial, Tahoma, Helvetica, sans-serif',
    },
    shape: {
    borderRadius: 0,
    },
    components: {
        MuiTab: {
            defaultProps: {
            disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
    MuiDrawer: {
        styleOverrides: {
        paper: {
            backgroundColor: '#003D66',
        },
        },
    },
    MuiButton: {
        styleOverrides: {
        root: {
            textTransform: 'none',
        },
        contained: {
            boxShadow: 'none',
            '&:active': {
            boxShadow: 'none'
            },
        },
        },
    },
    MuiTabs: {
        styleOverrides: {
        root: {
            marginLeft: theme.spacing(1),
        },
        indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: theme.palette.common.white,
        },
        },
    },
    MuiTab: {
        styleOverrides: {
        root: {
            textTransform: 'none',
            margin: '0 16px',
            minWidth: 0,
            padding: 0,
            [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
            },
        },
        },
    },
    MuiIconButton: {
        styleOverrides: {
        root: {
            padding: theme.spacing(1),
        },
        },
    },
    MuiTooltip: {
        styleOverrides: {
        tooltip: {
            borderRadius: 4,
        },
        },
    },
    MuiDivider: {
        styleOverrides: {
        root: {
            backgroundColor: 'rgb(255,255,255,0.15)',
        },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
        root: {
            '&.Mui-selected': {
            color: '#ffffff',
            backgroundColor: '#336485',
            borderRadius: '0.3rem'
            },
        },
        },
    },
    MuiListItemText: {
        styleOverrides: {
        primary: {
            fontSize: 18,
            fontWeight: theme.typography.fontWeightMedium,
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
        },
        },
    },
    MuiListItemIcon: {
        styleOverrides: {
        root: {
            color: 'inherit',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
            '& svg': {
            fontSize: 20,
            },
        },
        },
    },
    },
};

const drawerWidth = 256;

const Dashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };

    return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {isSmUp ? null : (
            <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
            />
            )}

            <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
            />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#ffffff' }}>
                <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', boxShadow: 'none' }}>
                    <Outlet />
                </Paper>
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#E6F5FF' }}>
            <Copyright />
            </Box>
        </Box>
        </Box>
    </ThemeProvider>
    );
}

export default Dashboard

// import { Outlet } from 'react-router-dom'
// import DashboardNavbar from '../components/DashboardNavbar'

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';

// import Toolbar from '@mui/material/Toolbar';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';

// // import { useSelector } from 'react-redux'

// const mdTheme = createTheme();

// const Dashboard = () => {

//     // const { employee } = useSelector((state) => state.auth)
    
//     return <>

//     <ThemeProvider theme={mdTheme}>
//         <Box sx={{ display: 'flex' }}>
//             {/* Normalize Styles */}
//             <CssBaseline />

//             {/* Drawer and Navbar */}
//             <DashboardNavbar />

//             {/* Main Content */}
//             <Box
//                 component="main"
//                 sx={{
//                 backgroundColor: (theme) =>
//                     theme.palette.mode === 'light'
//                     ? theme.palette.grey[100]
//                     : theme.palette.grey[900],
//                 flexGrow: 1,
//                 height: '100vh',
//                 overflow: 'auto',
//                 }}
//             >
//                 <Toolbar />

//                 <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <Grid container spacing={3}>
//                     {/* Content */}
//                     <Grid item xs={12}>
//                     <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                         <Outlet />
//                     </Paper>
//                     </Grid>
//                 </Grid>
//                 </Container>

//             </Box>
//         </Box>

//         {/* Footer */}
//         {/* <DashboardFooter /> */}

//     </ThemeProvider>
//     </>
// }

// export default Dashboard
