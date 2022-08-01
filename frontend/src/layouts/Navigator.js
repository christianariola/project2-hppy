import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react"
import { getCompany } from "../features/company/companySlice"
import Logo from "../components/company/Logo"

const categories = [
    {
        id: 'Hppy',
        superadmin: [
            {
                id: 'Home',
                icon: <img src="/images/dashboard/icons/icon-home.svg" alt="Home" />,
                active: true,
                route: '/app/dashboard'
            },
            { id: 'My Account', icon: <img src="/images/dashboard/icons/icon-account.svg" alt="My Account" />, route: '/app/account' },
            { id: 'Companies', icon: <PermMediaOutlinedIcon />, route: '/app/companies' },
            { id: 'Reports', icon: <img src="/images/dashboard/icons/icon-reports.svg" alt="Reports" />, route: '/app/report' },
        ],
        admin: [
            {
                id: 'Home',
                icon: <PeopleIcon />,
                active: true,
                route: '/app/dashboard'
            },
            { id: 'My Account', icon: <DnsRoundedIcon />, route: '/app/account' },
            { id: 'Reports', icon: <PublicIcon />, route: '/app/report' },
            { id: 'Company Settings', icon: <PermMediaOutlinedIcon />, route: '/app/company/settings' },
            { id: 'Departments', icon: <PermMediaOutlinedIcon />, route: '/app/company/departments' },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: '#ffffff',
    '&:hover, &:focus': {
    bgcolor: '#336485',
    borderRadius: '0.3rem'
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { employee } = useSelector(state => state.auth)

    const { company } = useSelector(state => state.company)
    useEffect(() => {
        if(employee.company_id){
            dispatch(getCompany(employee.company_id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employee.company_id])


    return (
    <Drawer variant="permanent" {...other}>
        <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', justifyContent: 'center' }}>
            {employee.company_id ? <Logo logo={company.logo} /> : <img src="/images/hppy-logo.svg" alt="Hppy" /> }
            {/* Hppy  */}
        </ListItem>
        {categories.map(({ id, superadmin }) => (
            <Box key={id} sx={{ bgcolor: '#003D66' }}>
            {superadmin.map(({ id: childId, icon, active, route }) => (
                <ListItem disablePadding key={childId} sx={{ py: 1, px: 2 }}>
                <ListItemButton selected={active} sx={item} onClick={()=>navigate(route)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                </ListItemButton>
                </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
            </Box>
        ))}
        </List>
    </Drawer>
    );
}