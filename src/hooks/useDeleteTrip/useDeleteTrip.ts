import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useDeleteTrip = () => {

    const deleteTrip = useCallback(async (tripId: string) => {
        await webClient.delete(`/v1/trips/${tripId}`)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.deleteTrip],
        mutationFn: deleteTrip
    })
}