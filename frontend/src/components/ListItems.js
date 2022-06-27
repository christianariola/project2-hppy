import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MoodIcon from '@mui/icons-material/Mood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <>
  <Link to="/app/dashboard">
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </Link>


    <ListItemButton>
      <ListItemIcon>
        <MoodIcon />
      </ListItemIcon>
      <ListItemText primary="My Survey" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Requests" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </>
)

export const secondaryListItems = (
  <>
  </>
)