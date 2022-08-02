import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useState } from "react"

// const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
    const { onDrawerToggle } = props;

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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

    const { employee } = useSelector(state => state.auth)

    const empInitials = employee.firstName.charAt(0)+employee.lastName.charAt(0)

    return (
    <React.Fragment>
        <AppBar color="default" position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>
        <Toolbar>
            <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
                >
                <MenuIcon />
                </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
                {/* <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton> */}

            <Tooltip title="User options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="{empName}" sx={{ bgcolor: "#0098FF" }}>{empInitials}</Avatar>
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
                    <Typography textAlign="center" onClick={()=>navigate('/app/account')}>My Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>navigate('/app/account/password')}>Change Password</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
                </MenuItem>
            </Menu>



            </Grid>
            </Grid>
        </Toolbar>
        </AppBar>

        <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
        >
        </AppBar>
    </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;