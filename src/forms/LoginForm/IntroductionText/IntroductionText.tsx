import { Typography } from '@mui/material'
import classes from './IntroductionText.module.scss'

export const IntroductionText = () => {
    return (
        <div className={classes.IntroductionText}>
            <Typography
                variant='h4'
                component='h1'
            >
                Welcome to ItineraryHub
            </Typography>
            <Typography
                variant='h6'
                className={classes.IntroductionText_Subheading}
                >
                Easily compare your next travel plans <br/> and organize your journey.
            </Typography>
        </div>
    )
}