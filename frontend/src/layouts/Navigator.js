import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { getCompany } from "../features/company/companySlice"
import Logo from "../components/company/Logo"
import HubIcon from '@mui/icons-material/Hub';

const superadminlist = [
    {
        id: 'Hppy',
        categories: [
            {
                id: 'Home',
                icon: <img src="/images/dashboard/icons/icon-home.svg" alt="Home" />,
                active: true,
                route: '/app/dashboard'
            },
            { id: 'My Account', icon: <img src="/images/dashboard/icons/icon-account.svg" alt="My Account" />, route: '/app/account' },
            { id: 'Companies', icon: <BusinessIcon style={{ fontSize: 30 }} />, route: '/app/companies' },
            { id: 'Reports', icon: <img src="/images/dashboard/icons/icon-reports.svg" alt="Reports" />, route: '/app/report' },
        ]
    },
];

const adminlist = [
    {
        id: 'Hppy',
        categories: [
            {
                id: 'Home',
                icon: <img src="/images/dashboard/icons/icon-home.svg" alt="Home" />,
                active: true,
                route: '/app/dashboard'
            },
            { id: 'My Account', icon: <img src="/images/dashboard/icons/icon-account.svg" alt="My Account" />, route: '/app/account' },
            { id: 'Reports', icon: <img src="/images/dashboard/icons/icon-reports.svg" alt="Reports" />, route: '/app/report' },
            { id: 'Settings', icon: <img src="/images/dashboard/icons/icon-settings.svg" alt="Reports" />, route: '/app/company/settings' },
            { id: 'Departments', icon: <HubIcon />, route: '/app/company/departments' },
        ]
    },
];

const employeelist = [
    {
        id: 'Hppy',
        categories: [
            {
                id: 'Home',
                icon: <img src="/images/dashboard/icons/icon-home.svg" alt="Home" />,
                active: true,
                route: '/app/dashboard'
            },
            { id: 'My Surveys', icon: <img src="/images/dashboard/icons/icon-survey.svg" alt="My Survey" />, route: '/app/monthlySurveys' },
            { id: 'My Account', icon: <img src="/images/dashboard/icons/icon-account.svg" alt="My Account" />, route: '/app/account' },
        ]
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
    let menuList

    switch(employee.role.toLowerCase()) {
        case "superadmin":
            menuList = superadminlist;
            break;
        case "employee":
            menuList = employeelist;
            break;
        case "manager":
            menuList = employeelist;
            break;
        case "admin":
            menuList = adminlist;
            break;
        default:
            menuList = employeelist;
            break;
    }

    // console.log("LIST", menuList)

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
        {menuList.map(({ id, categories }) => (
            <Box key={id} sx={{ bgcolor: '#003D66' }}>
            {categories.map(({ id: childId, icon, active, route }) => (
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