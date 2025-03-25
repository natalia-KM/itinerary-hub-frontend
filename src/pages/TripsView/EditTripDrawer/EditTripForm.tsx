import { TripFormBase } from 'pages/TripsView/TripFormBase'
import { transformDayJsToString, TripDetails } from 'utils'
import { useQueryClient } from '@tanstack/react-query'
import { UpdateTripRequest, UpdateTripRequestValues, useUpdateTrip } from 'hooks/useUpdateTrip'
import { TripFormFields } from 'pages/TripsView/shared'
import { toast } from 'react-toastify'
import { queryKeys } from 'config/queryKeys'
import dayjs from 'dayjs'

interface EditTripFormProps {
    tripDetails: TripDetails
    onClose: () => void
}

export const EditTripForm = ({
    tripDetails,
    onClose
}: EditTripFormProps) => {
    const client = useQueryClient()
    const { mutateAsync: updateTrip, isPending } = useUpdateTrip()

    const updateExistingTrip = (
        async ({ tripName, startDate, endDate, imageRef }: TripFormFields
    ) => {
            const isTripNameUnchanged = tripDetails.tripName === tripName
            const isStartDateUnchanged = dayjs(tripDetails.startDate).isSame(startDate)
            const isEndDateUnchanged = dayjs(tripDetails.endDate).isSame(endDate)
            const isImageRefUnchanged = tripDetails.imageRef === imageRef

            const isUnchanged =
                isTripNameUnchanged &&
                isStartDateUnchanged &&
                isEndDateUnchanged &&
                isImageRefUnchanged

            if (isUnchanged) {
                onClose()
                toast('Nothing to update!', { toastId: 'no-updates-edit-trip-form' })
                return
            }

            const values: UpdateTripRequestValues = {
                tripName: !isTripNameUnchanged ? tripName : undefined,
                startDate: !isStartDateUnchanged ? transformDayJsToString(startDate) : undefined,
                endDate: !isEndDateUnchanged ? transformDayJsToString(endDate) : undefined,
                imageRef: !isImageRefUnchanged ? imageRef : undefined
            }

            const request: UpdateTripRequest = {
                tripId: tripDetails.tripId,
                request: values
            }

            await updateTrip(request)
                .then(() => {
                    toast(`${tripName} updated.`, {
                        toastId: 'update-trip-success-toast'
                    })
                    client.invalidateQueries({ queryKey: [queryKeys.getAllTrips] })
                })
                .catch(() => {
                    toast('There was an error updating your trip.', {
                        type: 'error',
                        toastId: 'update-trip-error-toast'
                    })
                })
                .finally(() => {
                    onClose()
                })
    })

    return (
       <TripFormBase
           onSubmit={updateExistingTrip}
           onClose={onClose}
           testIdKey='edit-trip-form'
           isSubmitLoading={isPending}
           defaultValues={tripDetails}
       />
    )
}