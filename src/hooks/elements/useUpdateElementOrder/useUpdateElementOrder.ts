import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { ActivityElementDetails } from '../types'
import { UpdateElementOrderRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateElementOrder = () => {

    const updateElementOrder = useCallback( async ({
        request,
        baseElementId
    }: UpdateElementOrderRequest) => {
        await webClient.put<ActivityElementDetails>(`/v1/elements/${baseElementId}`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateElementOrder],
        mutationFn: updateElementOrder
    })
}