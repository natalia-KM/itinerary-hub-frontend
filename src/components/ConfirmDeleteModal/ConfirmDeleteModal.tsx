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
            isOpen={isOpen}
            modalTitle={`Delete ${itemType}`}
            actionButtonsProps={actionButtonsProps}>

            <WarningIcon className={classes.Icon}/>
            <Typography className={classes.Text}>
                Are you sure you want to delete {itemToDelete}? <br/>
                This action cannot be undone.
            </Typography>

        </CustomModal>
    )
}