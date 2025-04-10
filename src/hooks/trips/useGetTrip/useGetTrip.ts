import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { GetTripRequest, TripDO } from './types'

export const useGetTrip = ({ tripId }: GetTripRequest) => {

    const getTrip = useCallback(async () => {
        const { data } = await webClient.get<TripDO>(`/v1/trips/${tripId}`)
        return data
    }, [tripId])

    return useQuery({
      queryKey: [queryKeys.getTrip, tripId],
      queryFn: getTrip,
      enabled: !!tripId,
      refetchOnMount: 'always'
    })
}