import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Typography } from '@mui/material'
import classes from './InputErrorMessage.module.scss'

interface InputErrorMessageProps {
    error?: string
}

export const InputErrorMessage = ({ error }: InputErrorMessageProps) => {
    return (
            <Typography
                color='error'
                alignSelf='start'
                fontSize='12px'
                className={classes.InputErrorMessage}
                aria-label="Input error"
            >
                <ErrorOutlineIcon className={classes.InputErrorMessage__Icon}/>
                {error}
            </Typography>
    )
}