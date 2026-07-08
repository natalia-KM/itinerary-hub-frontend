import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import classes from './TopBar.module.scss'
import { AccountBar } from 'components/AccountBar'
import { HelpBar } from 'components/HelpBar'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { TopBarProps } from './types'
import { useNavigate } from 'react-router'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'

export const TopBar = ({
    showHomeButton = false,
    showHelpButton = true,
    showAccountButton = true
}: TopBarProps) => {
    const navigate = useNavigate()
    const { userDetails } = useUserDetailsContext()

    const redirectToHome = () => {
        navigate('/dashboard')
    }
    return(
        <AppBar className={classes.TopBar} data-testid='top-bar' sx={{ position: 'sticky', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Box
                    sx={{ md: 'flex' }}
                    onClick={redirectToHome}
                    className={classes.TopBar__Logo}
                    data-testid='top-bar-logo'
                >
                    <img src="logo.png" alt="logo"/>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    {showHomeButton && (
                        <IconButton
                            size="large"
                            aria-label="Home button"
                            color="inherit"
                            onClick={redirectToHome}
                            data-testid='top-bar-home-btn'
                        >
                            <HomeOutlinedIcon/>
                        </IconButton>
                    )}
                    {showHelpButton && (
                        <HelpBar />
                    )}
                    {/* The account menu is meaningless without a logged-in user
                        (e.g. an unauthenticated visitor on a public page). */}
                    {showAccountButton && userDetails && (
                        <AccountBar />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}