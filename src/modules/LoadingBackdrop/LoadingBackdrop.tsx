import { Backdrop, CircularProgress } from '@mui/material'
import classes from './LoadingBackdrop.module.scss'

interface LoadingBackdropProps {
    isOpen: boolean
    testId: string
    onClick?: () => void
}

export const LoadingBackdrop = ({ isOpen, testId, onClick }: LoadingBackdropProps) => {

    return (
        <Backdrop
            data-testid={testId}
            className={classes.LoadingBackdrop}
            sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
            open={isOpen}
            onClick={onClick}
        >
            <CircularProgress/>
        </Backdrop>
    )
}