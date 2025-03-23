import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import classes from './AccountMenu.module.scss'
import { useDeleteAccount } from 'hooks/useDeleteAccount'
import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal'

interface DeleteAccountProps {
    testId: string
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
}

export const DeleteAccount = ({
    testId,
    modalOpen,
    setModalOpen
}: DeleteAccountProps) => {
    const { mutateAsync: deleteAccount } = useDeleteAccount()

    return (
        <>
        <MenuItem onClick={() => setModalOpen(true)} data-testid={`${testId}-delete-account-button`}>
            <ListItemIcon>
                <HighlightOffIcon fontSize="small" className={classes.AccountMenu_error}/>
            </ListItemIcon>
            <ListItemText className={classes.AccountMenu_error}>Delete Account</ListItemText>
        </MenuItem>
        <ConfirmDeleteModal
            itemType='Account'
            itemToDelete='this account'
            isOpen={modalOpen}
            actionButtonsProps={{
                onCancel: () => setModalOpen(false),
                onConfirm: () => deleteAccount(),
                confirmErrorColor: true
            }} />
        </>
    )
}