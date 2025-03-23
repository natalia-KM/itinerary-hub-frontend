import { IconButton } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useState } from 'react'
import { HelpMenu } from './HelpMenu/HelpMenu'
import OutsideAlerter from 'utils/OutsideAlerter'

export const HelpBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleOpenMenu = () => {
        setMenuOpen((opened) => !opened)
    }

    const handleCloseMenu = () => {
        setMenuOpen(false)
    }

    return (
        <div>
            <OutsideAlerter onClickOutside={handleCloseMenu}>
                <IconButton
                    size="large"
                    aria-label="Show Help Popup"
                    color="inherit"
                    onClick={handleOpenMenu}
                    data-testid='top-bar-help-btn'
                >
                    <HelpOutlineIcon/>
                </IconButton>

                {menuOpen && (
                    <HelpMenu closeMenu={handleCloseMenu}/>
                )}
            </OutsideAlerter>
        </div>
    )
}