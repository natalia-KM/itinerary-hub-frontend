import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import GoogleIcon from '@mui/icons-material/Google'
import classes from './AccountMenu.module.scss'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { UserAvatar } from 'components/UserAvatar'
import { useLogout } from 'hooks/useLogout'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'
import { DeleteAccount } from './DeleteAccount'

interface AccountMenuProps {
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
}

export const AccountMenu = ({
    modalOpen,
    setModalOpen
}: AccountMenuProps) => {
    const { userDetails } = useUserDetailsContext()
    const { mutateAsync: logout } = useLogout()
    const { mutateAsync: signInWithGoogle } = useSignInWithGoogle()

    return (
        <Paper className={classes.AccountMenu}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                       <UserAvatar firstName={userDetails?.firstName} lastName={userDetails?.lastName} />
                    </ListItemIcon>
                    <ListItemText>{userDetails?.firstName} {userDetails?.lastName}</ListItemText>
                    {userDetails?.isGuest && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Guest Account
                        </Typography>
                    )}
                </MenuItem>
                {userDetails?.isGuest && (
                    <MenuItem onClick={() => signInWithGoogle()}>
                        <ListItemIcon>
                            <GoogleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Connect With Google</ListItemText>
                    </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                </MenuItem>
                <Divider />
                <DeleteAccount modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            </MenuList>
        </Paper>
    )
}