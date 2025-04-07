import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { TripDO } from '../useGetTrip/types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetTripDetails = (tripId: string) => {

    const getTripDetails = useCallback(async () => {
        const { data } = await webClient.get<TripDO>(`/v1/trips/${tripId}/details`)
        return data
    }, [tripId])

    return useMutation({
        mutationKey: [queryKeys.getTripDetails, tripId],
        mutationFn: getTripDetails
    })
}