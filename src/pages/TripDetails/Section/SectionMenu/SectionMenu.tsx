import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import classes from './SectionMenu.module.scss'
import { ManageOptionsModal } from 'pages/TripDetails/Option'
import { AddElementDrawer } from 'pages/TripDetails/AddElementDrawer'
import { SectionDetails } from 'hooks/sections'
import { ModalProps } from 'utils'
import { DeleteSectionModal } from '../DeleteSectionModal/DeleteSectionModal'

interface OptionMenuProps {
    manageOptionsModal: ModalProps
    elementDrawer: ModalProps
    deleteSectionModal: ModalProps
    closeMenu: (val: boolean) => void
    sectionDetails: SectionDetails
}

export const SectionMenu = ({
    manageOptionsModal,
    elementDrawer,
    deleteSectionModal,
    sectionDetails,
    closeMenu
}: OptionMenuProps) => {
    const closeOptionsModal = () => {
        manageOptionsModal.setModalOpen(false)
        closeMenu(true)
    }

    const closeElementDrawer = () => {
        elementDrawer.setModalOpen(false)
        closeMenu(false)
    }

    const closeDeleteSectionModal = () => {
        deleteSectionModal.setModalOpen(false)
        closeMenu(false)
    }

    return (
        <Paper className={classes.OptionMenu} data-testid='section-menu'>
            <MenuList>
                <MenuItem
                    data-testid='section-menu-add-element-button'
                    onClick={() => elementDrawer.setModalOpen(true)}
                >
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Add New Element
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    data-testid='section-menu-manage-options-button'
                    onClick={() => manageOptionsModal.setModalOpen(true)}
                >
                    <ListItemIcon>
                       <EditIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Manage Options
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    data-testid='section-menu-delete-section-button'
                    onClick={() => deleteSectionModal.setModalOpen(true)}
                >
                    <ListItemIcon>
                        <DeleteForeverIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete Section
                    </ListItemText>
                </MenuItem>
                <ManageOptionsModal
                    sectionId={sectionDetails.sectionId}
                    isOpen={manageOptionsModal.modalOpen}
                    actionButtonsProps={{
                        onConfirm: closeOptionsModal,
                        confirmTitle: 'Done',
                        showCancel: false
                    }}
                />
                <AddElementDrawer
                    sectionId={sectionDetails.sectionId}
                    isOpen={elementDrawer.modalOpen}
                    closeDrawer={closeElementDrawer}
                    sectionDetails={sectionDetails}
                />
                <DeleteSectionModal
                    isOpen={deleteSectionModal.modalOpen}
                    setClosed={closeDeleteSectionModal}
                    sectionDetails={sectionDetails}
                />
            </MenuList>
        </Paper>
    )
}