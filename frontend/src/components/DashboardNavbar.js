import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useState } from "react"

// MUI imports
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { employeeListItems, superadminListItems } from '../components/ListItems'

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
zIndex: theme.zIndex.drawer + 1,
transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
    '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
        },
    }),
    },
}),
);

const DashboardHeader = () => {

    // Avatar Popup
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(true);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    let employeeList
    const { employee } = useSelector(state => state.auth)
    switch(employee.role) {
        case "superadmin":
            employeeList = superadminListItems;
            break;
        case "employee":
            employeeList = employeeListItems;
            break;
        default:
            employeeList = employeeListItems;
            break;
    }
        
    return <>

        <AppBar position="absolute" open={open} color="default">
            <Toolbar
            sx={{
                pr: '24px', // keep right padding when drawer closed
            }}
            >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Dashboard
            </Typography>

            <IconButton color="inherit" sx={{ mr: "10px"}}>
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Christian Ariola" sx={{ bgcolor: "#0098FF" }} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
                </MenuItem>
            </Menu>
            </Box>

            </Toolbar>
        </AppBar>

        {/* Side Menu */}
        <Drawer variant="permanent" open={open} PaperProps={{
            sx: {
                backgroundColor: "#003D66",
                color: "white"
            }
        }}
        >
            <img src="/images/hppy-logo.svg" alt="Hppy" />

            <Divider />
            
            <List component="nav">
                {employeeList}
                <Divider sx={{ my: 1 }} />
            </List>

            
        </Drawer>

    </>
}

export default DashboardHeader
