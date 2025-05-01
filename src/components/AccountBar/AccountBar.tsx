import { IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { AccountMenu } from './AccountMenu/AccountMenu'
import OutsideAlerter from 'utils/OutsideAlerter'

export const AccountBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [infoModalOpen, setInfoModalOpen] = useState(false)

    const handleOpenMenu = () => {
        setMenuOpen((opened) => !opened)
    }

    const handleCloseMenu = () => {
        if(!deleteModalOpen && !infoModalOpen) setMenuOpen(false)
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
                    data-testid='top-bar-account-btn'
                >
                    <AccountCircleIcon/>
                </IconButton>
                {menuOpen && (
                    <AccountMenu
                        deleteModal={{
                            modalOpen: deleteModalOpen,
                            setModalOpen: setDeleteModalOpen
                        }}
                        infoModal={{
                            modalOpen: infoModalOpen,
                            setModalOpen: setInfoModalOpen
                        }}
                    />
                )}
            </OutsideAlerter>
        </div>
    )
}