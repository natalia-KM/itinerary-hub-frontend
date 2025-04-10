import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { OptionDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

interface UpdateOptionOrdersRequest {
    sectionId: string
    request: OptionDetails[]
}

export const useUpdateOptionOrders = () => {

    const updateOrders = useCallback(async ({ sectionId, request }: UpdateOptionOrdersRequest) => {
        await webClient.put(`/v1/sections/${sectionId}/options`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateOptionOrders],
        mutationFn: updateOrders
    })
}