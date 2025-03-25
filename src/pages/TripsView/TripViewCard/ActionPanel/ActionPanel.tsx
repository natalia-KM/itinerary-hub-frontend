import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import classes from './ActionPanel.module.scss'
import { TripDetails } from 'utils'
import { EditTripDrawer } from 'pages/TripsView/EditTripDrawer'
import { DeleteTrip } from 'pages/TripsView/DeleteTrip'

interface ActionPanelProps {
    tripDetails: TripDetails
    editTripDrawerOpen: boolean
    setEditTripDrawerOpen: (value: boolean) => void
    deleteModalOpen: boolean
    setDeleteModalOpen: (value: boolean) => void
    closeActionMenu: () => void
}

export const ActionPanel = ({
    tripDetails,
    editTripDrawerOpen,
    setEditTripDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    closeActionMenu
}: ActionPanelProps) => {
    const testIdPrefix = 'trip-card-action-panel'

    return (
        <>
        <Paper className={classes.ActionPanel} data-testid={testIdPrefix}>
            <MenuList>
                <MenuItem onClick={() => setEditTripDrawerOpen(true)} data-testid={`${testIdPrefix}-edit-trip-btn`}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Edit Trip
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setDeleteModalOpen(true)} data-testid={`${testIdPrefix}-delete-trip-btn`}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Delete Trip
                    </ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
            {editTripDrawerOpen && (
                <EditTripDrawer
                    existingTripDetails={tripDetails}
                    isOpen={editTripDrawerOpen}
                    setClosed={() => {
                        setEditTripDrawerOpen(false)
                        closeActionMenu()
                    }}
                />
            )}

            {deleteModalOpen && (
                <DeleteTrip
                    tripId={tripDetails.tripId}
                    tripName={tripDetails.tripName}
                    modalOpen={deleteModalOpen}
                    setModalOpen={() => {
                        setDeleteModalOpen(false)
                        closeActionMenu()
                    }}
                />
            )}
        </>
    )
}