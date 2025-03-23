import { IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { AccountMenu } from './AccountMenu/AccountMenu'
import OutsideAlerter from 'utils/OutsideAlerter'

export const AccountBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const handleOpenMenu = () => {
        setMenuOpen((opened) => !opened)
    }

    const handleCloseMenu = () => {
        if(!modalOpen) setMenuOpen(false)
    }

    return (
        <div>
            <OutsideAlerter onClickOutside={handleCloseMenu}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="Show Account Information and Actions"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                    color="inherit"
                >
                    <AccountCircleIcon/>
                </IconButton>
                {menuOpen && (
                    <AccountMenu modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                )}
            </OutsideAlerter>
        </div>
    )
}