import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { TripDetails } from 'utils'

export const getTripDetails = (async (tripId: string) => {
    const { data } = await webClient.get<TripDetails>(`/v1/trips/${tripId}/details`)
    return data
})


export const useGetTripDetails = (tripId: string) => {

    return useMutation({
        mutationKey: [queryKeys.getTripDetails, tripId],
        mutationFn: () => getTripDetails(tripId)
    })
}