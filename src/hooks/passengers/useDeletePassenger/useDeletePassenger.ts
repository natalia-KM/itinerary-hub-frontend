import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import webClient from 'config/clientConfig'
import { useCallback } from 'react'

export const useDeletePassenger = () => {

    const deletePassenger = useCallback(async (passengerId: string) => {
        await webClient.delete(`/v1/passengers/${passengerId}`)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.deletePassenger],
        mutationFn: deletePassenger
    })
}