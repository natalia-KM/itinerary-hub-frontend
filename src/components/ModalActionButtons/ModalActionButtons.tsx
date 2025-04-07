import { Box, Button, Typography } from '@mui/material'
import { ModalActionButtonsProps } from './types'
import classes from './ModalActionButtons.module.scss'
import classnames from 'classnames'

export const ModalActionButtons = ({
    onCancel,
    onConfirm,
    confirmErrorColor = false,
    cancelTitle = 'Cancel',
    confirmTitle = 'Confirm',
    showCancel = true,
    isLoading,
    isDisabled
} :ModalActionButtonsProps) => {

    return (
        <Box className={classes.Container}>
            {showCancel && (
                <Button
                    data-testid='modal-cancel-button'
                    variant='outlined'
                    disabled={isLoading}
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
            )}

            <Box sx={{ flexGrow: '1' }} />

            <Button
                data-testid='modal-confirm-button'
                variant='contained'
                onClick={onConfirm}
                loading={isLoading}
                disabled={isDisabled}
                className={classnames(
                    classes.Container__Button,
                    !confirmErrorColor && classes.Container__ConfirmButton,
                    confirmErrorColor && classes.Container_errorColor
                )}
            >
                <Typography textTransform='none'>
                    {confirmTitle}
                </Typography>
            </Button>
        </Box>
    )

}