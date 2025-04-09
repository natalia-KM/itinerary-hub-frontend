import { Backdrop, CircularProgress } from '@mui/material'
import classes from './LoadingBackdrop.module.scss'

interface LoadingBackdropProps {
    isOpen: boolean
    testId: string
}

export const LoadingBackdrop = ({ isOpen, testId }: LoadingBackdropProps) => {

    return (
        <Backdrop
            data-testid={testId}
            className={classes.LoadingBackdrop}
            sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
            open={isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}