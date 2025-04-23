import { Box, Button, Typography } from '@mui/material'
import classes from './DrawerActionButton.module.scss'
import classnames from 'classnames'

interface DrawerActionButtonsProps {
    confirmDisabled?: boolean
    confirmLoading?: boolean
    onCancel: () => void
    cancelTitle?: string
    confirmTitle?: string
}

export const DrawerActionButtons = ({
   onCancel,
   confirmLoading,
   confirmDisabled,
   cancelTitle = 'Cancel',
   confirmTitle = 'Confirm'
} :DrawerActionButtonsProps) => {

    return (
        <Box className={classes.Container}>
            <Button
                data-testid='drawer-cancel-button'
                variant='outlined'
                onClick={onCancel}
                className={classnames(
                    classes.Container__Button,
                    classes.Container__CancelButton
                )}
            >
                <Typography textTransform='none'>
                    {cancelTitle}
                </Typography>
            </Button>

            <Box sx={{ flexGrow: '1' }} />

            <Button
                data-testid='drawer-confirm-button'
                type='submit'
                variant='contained'
                loading={confirmLoading}
                disabled={confirmDisabled}
                className={classnames(
                    classes.Container__Button,
                    classes.Container__ConfirmButton
                )}
            >
                <Typography textTransform='none'>
                    {confirmTitle}
                </Typography>
            </Button>
        </Box>
    )
}