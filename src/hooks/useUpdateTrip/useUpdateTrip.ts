import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { UpdateTripRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateTrip = () => {

    const updateTrip = useCallback(async ({ tripId, request }: UpdateTripRequest) => {
        await webClient.put(`/v1/trips/${tripId}`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateTrip],
        mutationFn: updateTrip
    })
}