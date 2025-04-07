import { useGetAllTrips } from './useGetAllTrips'
import { TripDetailsResponse } from './types'
import { TripDetails } from 'utils/types'

export const useMutateAllTrips = () => {
    const { data: unformattedTrips, isLoading, isError } = useGetAllTrips()

    const transformResponseToDetails = (trip: TripDetailsResponse): TripDetails => {
        const startDate = trip.startDate ? new Date(trip.startDate) : undefined
        const endDate = trip.endDate ? new Date(trip.endDate) : undefined
        const createdAt = new Date(trip.createdAt)

        return {
            ...trip,
            createdAt: createdAt,
            startDate: startDate,
            endDate: endDate
        }
    }

    const getAllTrips = () => {
        if(!unformattedTrips || unformattedTrips.length === 0) return []

        const tripArray: TripDetails[] = []

        unformattedTrips.forEach((trip) => {
            tripArray.push(transformResponseToDetails(trip))
        })

        return tripArray
    }

    return {
        trips: getAllTrips(),
        isLoading,
        isError
    }
}