import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BusinessIcon from '@mui/icons-material/Business';

const CompanyData = (props) => {
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
            Total Companies
            </Typography>
            <Typography
            color="textPrimary"
            variant="h4"
            >
            {props.datastat}
            </Typography>
        </Grid>
        <Grid item>
            <Avatar
            sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
            }}
            >
            <BusinessIcon />
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

export default CompanyData
