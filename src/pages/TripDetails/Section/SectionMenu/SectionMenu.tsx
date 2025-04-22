import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import classes from './SectionMenu.module.scss'
import { ManageOptionsModal } from 'pages/TripDetails/Option'
import { AddElementDrawer } from 'pages/TripDetails/AddElementDrawer'
import { SectionDetails } from 'hooks/sections'

interface OptionMenuProps {
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
    elementDrawerOpen: boolean
    setElementDrawerOpen: (value: boolean) => void
    closeMenu: () => void
    sectionDetails: SectionDetails
}

export const SectionMenu = ({
    modalOpen,
    setModalOpen,
    elementDrawerOpen,
    setElementDrawerOpen,
    sectionDetails,
    closeMenu
}: OptionMenuProps) => {
    const closeModal = () => {
        setModalOpen(false)
        closeMenu()
    }

    const closeDrawer = () => {
        setElementDrawerOpen(false)
        closeMenu()
    }

    return (
        <Paper className={classes.OptionMenu} data-testid='section-menu'>
            <MenuList>
                <MenuItem onClick={() => setElementDrawerOpen(true)}>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Add New Element
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    data-testid='section-menu-manage-options-button'
                    onClick={() => setModalOpen(true)}
                >
                    <ListItemIcon>
                       <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Manage Options
                    </ListItemText>
                </MenuItem>
                <ManageOptionsModal
                    sectionId={sectionDetails.sectionId}
                    isOpen={modalOpen}
                    actionButtonsProps={{
                        onConfirm: closeModal,
                        confirmTitle: 'Done',
                        showCancel: false
                    }}
                />
                <AddElementDrawer
                    sectionId={sectionDetails.sectionId}
                    isOpen={elementDrawerOpen}
                    closeDrawer={closeDrawer}
                    sectionDetails={sectionDetails}
                />
            </MenuList>
        </Paper>
    )
}