import { ConfirmDeleteModalProps } from './types'
import { Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import { CustomModal } from 'components/CustomModal'
import classes from './ConfirmDeleteModal.module.scss'

export const ConfirmDeleteModal = ({
    itemType,
    itemToDelete,
    isOpen,
    actionButtonsProps
}: ConfirmDeleteModalProps) => {

    return (
        <CustomModal
            testId='confirm-delete-modal'
            isOpen={isOpen}
            modalTitle={`Delete ${itemType}`}
            actionButtonsProps={actionButtonsProps}
        >

            <WarningIcon className={classes.Icon} data-testid='confirm-delete-modal-warning-icon'/>
            <Typography className={classes.Text}  data-testid='confirm-delete-modal-text'>
                Are you sure you want to delete {itemToDelete}? <br/>
                This action cannot be undone.
            </Typography>

        </CustomModal>
    )
}