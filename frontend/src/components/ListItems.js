import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import {Link} from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
// import { Link as MaterialLink }from "@mui/material/Link";
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
// import ReportMain from '../pages/report/ReportMain';

export const employeeListItems = (
<>
    <ListItemButton component={RouterLink} to='/app/dashboard'>
        <img src="/images/dashboard/icons/icon-home.svg" alt="Home" />
        <ListItemText primary="Home" sx={{ ml: '10px' }} />
    </ListItemButton>


    <ListItemButton component={RouterLink} to='/app/monthlySurveys'>
        <img src="/images/dashboard/icons/icon-survey.svg" alt="My Survey" />
        <ListItemText primary="My Surveys" sx={{ ml: '10px' }} />
    </ListItemButton>

    <ListItemButton component={RouterLink} to='/app/account'>
        <img src="/images/dashboard/icons/icon-account.svg" alt="My Account" />
        <ListItemText primary="My Account" sx={{ ml: '10px' }} />
    </ListItemButton>

    <ListItemButton component={RouterLink} to='/app/report'>
        <img src="/images/dashboard/icons/icon-reports.svg" alt="Reports" />
        <ListItemText primary="Reports" sx={{ ml: '10px' }} />
    </ListItemButton>
</>
)

export const superadminListItems = (
    <>
    <ListItemButton component={RouterLink} to='/app/dashboard'>
        <img src="/images/dashboard/icons/icon-home.svg" alt="Home" />
        <ListItemText primary="Home" sx={{ ml: '10px' }} />
    </ListItemButton>

    <ListItemButton component={RouterLink} to='/app/account'>
        <img src="/images/dashboard/icons/icon-account.svg" alt="My Account" />
        <ListItemText primary="My Account" sx={{ ml: '10px' }} />
    </ListItemButton>

    {/* <ListItemButton>
        <img src="/images/dashboard/icons/icon-request.svg" alt="Requests" />
        <ListItemText primary="Requests" sx={{ ml: '10px' }} />
    </ListItemButton> */}

    <ListItemButton component={RouterLink} to='/app/report'>
        <img src="/images/dashboard/icons/icon-reports.svg" alt="Reports" />
        <ListItemText primary="Reports" sx={{ ml: '10px' }} />
    </ListItemButton>
    
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div" sx={{ backgroundColor: '#336485', textColor: 'white' }} color="inherit">
        Admin Section
    </ListSubheader>

    <ListItemButton component={RouterLink} to='/app/companies'>
        <img src="/images/dashboard/icons/icon-survey.svg" alt="Companies" />
        <ListItemText primary="Companies" sx={{ ml: '10px' }} />
    </ListItemButton>
    </>
)