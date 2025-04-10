import { TripDetails } from './TripDetails'
import { useHydrateTrip } from 'hooks/useHydrateTrip'
import { LoadingBackdrop } from 'modules/LoadingBackdrop'
import { TripNotFoundError } from 'modules/TripNotFoundError'

export const TripDetailsPage = () => {
    const { trip, isPending, isError } = useHydrateTrip()

    if(isPending) {
        return (
            <LoadingBackdrop isOpen={true} testId='trip-details-page-loading'/>
        )
    }

    if (isError || !trip) {
        return (
            <TripNotFoundError/>
        )
    }

    return (
        <TripDetails/>
    )
}