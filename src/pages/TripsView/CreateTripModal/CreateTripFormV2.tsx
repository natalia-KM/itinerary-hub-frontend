import { useCreateTrip } from 'hooks/trips/useCreateTrip'
import { CreateTripRequest } from 'hooks/trips/useCreateTrip/types'
import { transformDayJsToString } from 'utils/DateHelper'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { TripFormFields } from 'pages/TripsView/shared'
import { TripFormBase } from 'pages/TripsView/TripFormBase'

interface CreateTripFormProps {
    onClose: () => void
}

export const CreateTripForm = ({ onClose }: CreateTripFormProps) => {
    const client = useQueryClient()
    const { mutateAsync: createTrip, isPending } = useCreateTrip()

    const createNewTrip = (
        async ({ tripName, startDate, endDate, imageRef }: TripFormFields
        ) => {
            const request: CreateTripRequest = {
                tripName,
                startDate: transformDayJsToString(startDate),
                endDate: transformDayJsToString(endDate),
                imageRef
            }
            await createTrip(request)
                .then(() => {
                    toast(`${tripName} created!`, {
                        toastId: 'create-trip-success-toast'
                    })
                    client.invalidateQueries({ queryKey: [queryKeys.getAllTrips] })
                })
                .catch(() => {
                    toast('There was an error creating your trip.', {
                        type: 'error',
                        toastId: 'create-trip-error-toast'
                    })
                })
                .finally(() => {
                    onClose()
                })
        }
    )

    return (
        <TripFormBase
            onSubmit={createNewTrip}
            onClose={onClose}
            testIdKey='create-trip-form'
            isSubmitLoading={isPending}
        />
    )
}