import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import classes from './SectionMenu.module.scss'
import { ManageOptionsModal } from 'pages/TripDetails/Option'

interface OptionMenuProps {
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
    closeMenu: () => void
    sectionId: string
}

export const SectionMenu = ({
    modalOpen,
    setModalOpen,
    sectionId,
    closeMenu
}: OptionMenuProps) => {

    const closeModal = () => {
        setModalOpen(false)
        closeMenu()
    }

    return (
        <Paper className={classes.OptionMenu} data-testid='section-menu'>
            <MenuList>
                <MenuItem>
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
                    sectionId={sectionId}
                    isOpen={modalOpen}
                    actionButtonsProps={{
                        onConfirm: closeModal,
                        confirmTitle: 'Done',
                        showCancel: false
                    }}
                />
            </MenuList>
        </Paper>
    )
}