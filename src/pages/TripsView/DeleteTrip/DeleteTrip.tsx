import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal'
import { useDeleteTrip } from 'hooks/trips/useDeleteTrip/useDeleteTrip'
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
                    toastId: 'delete-trip-success-toast'
                })
                client.invalidateQueries({ queryKey: [queryKeys.getAllTrips] })
            })
            .catch(() => {
                toast('There was an error deleting your trip.', {
                    toastId: 'delete-trip-error-toast'
                })
            })
            .finally(() => {
                setModalOpen(false)
            })
    }

    return (
        <>
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