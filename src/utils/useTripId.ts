import { useSearchParams } from 'react-router'

export const useTripId = () => {
    const [searchParams] = useSearchParams()
    const tripId = searchParams.get('tripId')

    return {
        tripId: tripId ?? ''
    }
}