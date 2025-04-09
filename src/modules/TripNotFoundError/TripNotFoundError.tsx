import { Box, Button, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import classes from './TripNotFoundError.module.scss'
import { TopBar } from '../TopBar'
import { useNavigate } from 'react-router'

export const TripNotFoundError = () => {
    const navigate = useNavigate()

    const redirectToTrips = () => {
        navigate('/dashboard')
    }

    return (
        <div className={classes.Page}>
            <TopBar/>
            <Box className={classes.Page__Container}>
                <ErrorOutlineIcon fontSize="large"/>

                <Typography variant="h4" data-testid='error-page-message'>
                    Couldn't find your trip
                </Typography>

                <Button onClick={redirectToTrips} data-testid='error-page-button'>
                    Go to your trips
                </Button>
            </Box>
        </div>
    )
}