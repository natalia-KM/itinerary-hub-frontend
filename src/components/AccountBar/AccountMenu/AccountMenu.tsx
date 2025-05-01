import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import GoogleIcon from '@mui/icons-material/Google'
import classes from './AccountMenu.module.scss'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { UserAvatar } from 'components/UserAvatar'
import { useLogout } from 'hooks/useLogout'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'
import { DeleteAccount } from './DeleteAccount'
import { ModalProps } from 'utils'
import { AccountInfoModal } from '../AccountInfoModal/AccountInfoModal'

interface AccountMenuProps {
    deleteModal: ModalProps
    infoModal: ModalProps
}

export const AccountMenu = ({
    deleteModal,
    infoModal
}: AccountMenuProps) => {
    const { userDetails } = useUserDetailsContext()
    const { mutateAsync: logout } = useLogout()
    const { mutateAsync: signInWithGoogle } = useSignInWithGoogle()
    const testIdPrefix = 'top-bar-account-menu'

    return (
        <Paper className={classes.AccountMenu} data-testid={testIdPrefix}>
            <MenuList>
                <MenuItem onClick={() => infoModal.setModalOpen(true)} data-testid={`${testIdPrefix}-user-details`}>
                    <ListItemIcon>
                       <UserAvatar firstName={userDetails?.firstName} lastName={userDetails?.lastName} />
                    </ListItemIcon>
                    <ListItemText data-testid={`${testIdPrefix}-name`}>{userDetails?.firstName} {userDetails?.lastName}</ListItemText>
                    {userDetails?.isGuest && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} data-testid={`${testIdPrefix}-guest-badge`}>
                            Guest Account
                        </Typography>
                    )}
                </MenuItem>
                <AccountInfoModal isOpen={infoModal.modalOpen} closeModal={() => infoModal.setModalOpen(false)} />
                {userDetails?.isGuest && (
                    <MenuItem onClick={() => signInWithGoogle()} data-testid={`${testIdPrefix}-link-google-account`}>
                        <ListItemIcon>
                            <GoogleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Connect With Google</ListItemText>
                    </MenuItem>
                )}
                {!userDetails?.isGuest && (
                    <>
                        <Divider />
                        <MenuItem onClick={() => logout()} data-testid={`${testIdPrefix}-logout`}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Log out</ListItemText>
                        </MenuItem>
                    </>
                )}
                <Divider />
                <DeleteAccount testId={testIdPrefix} modalOpen={deleteModal.modalOpen} setModalOpen={deleteModal.setModalOpen}/>
            </MenuList>
        </Paper>
    )
}