import { Backdrop, CircularProgress } from '@mui/material'
import classes from './LoadingBackdrop.module.scss'

export const LoadingBackdrop = ({ isOpen } : { isOpen: boolean }) => {

    return (
        <Backdrop
            data-testid='trips-view-loading'
            className={classes.LoadingBackdrop}
            sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
            open={isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}