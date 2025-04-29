import { CustomModal } from 'components/CustomModal'
import { useDeletePassenger } from 'hooks/passengers/useDeletePassenger'
import { PassengerDetails } from 'hooks/elements'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import WarningIcon from '@mui/icons-material/Warning'
import classes from 'components/ConfirmDeleteModal/ConfirmDeleteModal.module.scss'
import { Typography } from '@mui/material'

interface DeletePassengerModalProps {
    passenger: PassengerDetails
    isOpen: boolean
    closeModal: () => void
}

export const DeletePassengerModal = ({
    isOpen,
    closeModal,
    passenger
}: DeletePassengerModalProps) => {
    const queryClient = useQueryClient()
    const { mutateAsync: deletePassenger } = useDeletePassenger()

    const onDelete = async () => {
        await deletePassenger(passenger.passengerId)
            .then(async () => {
                await queryClient.invalidateQueries({ queryKey: [queryKeys.getAllPassengers] })
            })
            .catch(() => {
                toast.error('Couldn\'t delete the passenger. Try again later', { toastId: 'delete-passenger-error-toast' })
            })
            .finally(() => {
                closeModal()
            })
    }

    return (
        <CustomModal
            isOpen={isOpen}
            modalTitle={'Delete Passenger'}
            actionButtonsProps={{
                onConfirm: onDelete,
                onCancel: closeModal
            }}
            testId={'delete-passenger-modal'}
        >
            <WarningIcon className={classes.Icon} data-testid='confirm-delete-modal-warning-icon'/>
            <Typography className={classes.Text}  data-testid='confirm-delete-modal-text'>
                Are you sure you want to delete passenger {passenger.firstName} {passenger.lastName}? <br/>
                They will be removed from all trips, and this action cannot be undone.
            </Typography>
        </CustomModal>
    )
}