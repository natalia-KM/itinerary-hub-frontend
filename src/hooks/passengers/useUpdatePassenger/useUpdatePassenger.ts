import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export interface UpdatePassengerRequest {
    passengerId: string
    request: {
        firstName?: string
        lastName?: string
        avatar?: string
    }
}

export const useUpdatePassenger = () => {

    const updatePassenger = useCallback(async ({ passengerId, request }: UpdatePassengerRequest) => {
        await webClient.put(`/v1/passengers/${passengerId}`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updatePassenger],
        mutationFn: updatePassenger
    })
}