import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { CreateTripRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useCreateTrip = () => {

    const createTrip = useCallback(async (request: CreateTripRequest) => {
        await webClient.post('/v1/trips', request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.createTrip],
        mutationFn: createTrip
    })
}