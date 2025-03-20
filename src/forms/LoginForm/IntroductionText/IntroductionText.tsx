import { Typography } from '@mui/material'
import classes from './IntroductionText.module.scss'

export const IntroductionText = () => {
    return (
        <div className={classes.IntroductionText}>
            <Typography
                variant='h4'
                component='h1'
                aria-label="Welcome to ItineraryHub"
            >
                Welcome to ItineraryHub
            </Typography>
            <Typography
                variant='h6'
                className={classes.IntroductionText_Subheading}
                aria-label="Compare and organize your travel plans"
                >
                Easily compare your next travel plans <br/> and organize your journey.
            </Typography>
        </div>
    )
}