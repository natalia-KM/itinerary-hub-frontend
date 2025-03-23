import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import classes from './TopBar.module.scss'
import { AccountBar } from 'components/AccountBar'
import { HelpBar } from 'components/HelpBar'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { TopBarProps } from './types'

export const TopBar = ({
    showHomeButton = false
}: TopBarProps) => {
    const redirectToHome = () => {
        window.location.href = '/dashboard'
    }
    return(
        <AppBar position="static" className={classes.TopBar} data-testid='top-bar'>
            <Toolbar>
                <Box
                    sx={{ md: 'flex' }}
                    onClick={redirectToHome}
                    className={classes.TopBar__Logo}
                    data-testid='top-bar-logo'
                >
                    <img src="./src/assets/logo.png" alt="logo"/>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    {showHomeButton ? (
                        <IconButton
                            size="large"
                            aria-label="Home button"
                            color="inherit"
                            onClick={redirectToHome}
                            data-testid='top-bar-home-btn'
                        >
                            <HomeOutlinedIcon/>
                        </IconButton>
                    ) : (
                        <HelpBar />
                    )}
                    <AccountBar />
                </Box>
            </Toolbar>
        </AppBar>
    )
}