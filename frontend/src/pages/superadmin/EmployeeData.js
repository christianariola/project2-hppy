import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const EmployeeData = (props) => {
    return <>
    <Card
    sx={{ height: '100%' }}
    {...props}
    >
    <CardContent>
        <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
        >
        <Grid item>
            <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            >
            Total Employees
            </Typography>
            <Typography
            color="textPrimary"
            variant="h4"
            >
            495
            </Typography>
        </Grid>
        <Grid item>
            <Avatar
            sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
            }}
            >
            <PeopleOutlineIcon />
            </Avatar>
        </Grid>
        </Grid>
        <Box
        sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
        }}
        >
        <Typography
            color="textSecondary"
            variant="caption"
        >
            {/* Since last month */}
        </Typography>
        </Box>
    </CardContent>
    </Card>
    </>
}

export default EmployeeData
