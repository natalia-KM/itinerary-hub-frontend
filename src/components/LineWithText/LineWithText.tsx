import classes from './LineWithText.module.scss'
import { Typography } from '@mui/material'

export const LineWithText = () => {
    return (
        <div className={classes.Wrapper}>
            <Typography className={classes.Heading}>
                Or
            </Typography>
        </div>
    )
}