import classes from './HelpMenu.module.scss'
import { ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

interface HelpMenuProps {
    closeMenu: () => void
}

export const HelpMenu = ({
    closeMenu
}: HelpMenuProps) => {

    const redirectToHelpPage = () => {
        closeMenu()
        window.open('/help')
    }

    return (
        <Paper className={classes.HelpMenu} data-testid='top-bar-help-menu'>
            <MenuList>
                <MenuItem onClick={redirectToHelpPage} data-testid='top-bar-help-redirect-btn'>
                    <ListItemText>Open Help Page in a new tab</ListItemText>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <OpenInNewIcon fontSize='small'/>
                    </Typography>
                </MenuItem>
            </MenuList>
        </Paper>
    )
}