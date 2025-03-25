import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import classes from './DeleteTrip.module.scss'
import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal'
import { useDeleteTrip } from 'hooks/useDeleteTrip/useDeleteTrip'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

interface DeleteTripProps {
    tripId: string,
    tripName: string,
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
}

export const DeleteTrip = ({
  tripId,
  tripName,
  modalOpen,
  setModalOpen
}: DeleteTripProps) => {
    const client = useQueryClient()
    const { mutateAsync: deleteTrip, isPending } = useDeleteTrip()

    const onDelete = () => {
        deleteTrip(tripId)
            .then(() => {
                toast('Trip successfully deleted.', {
                    toastId: 'delete-trip-success-modal'
                })
                client.invalidateQueries({ queryKey: [queryKeys.getAllTrips] })
            })
            .catch(() => {
                toast('There was an error deleting your trip.', {
                    toastId: 'delete-trip-error-modal'
                })
            })
            .finally(() => {
                setModalOpen(false)
            })
    }

    const testId = 'delete-trip-modal'

    return (
        <>
            <MenuItem onClick={() => setModalOpen(true)} data-testid={`${testId}-delete-trip-button`}>
                <ListItemIcon>
                    <HighlightOffIcon fontSize="small" className={classes.Error}/>
                </ListItemIcon>
                <ListItemText className={classes.Error}>Delete Trip</ListItemText>
            </MenuItem>
            <ConfirmDeleteModal
                itemType="Trip"
                itemToDelete={tripName}
                isOpen={modalOpen}
                actionButtonsProps={{
                    onCancel: () => setModalOpen(false),
                    onConfirm: onDelete,
                    confirmErrorColor: true,
                    isLoading: isPending
                }}
            />
        </>
    )
}