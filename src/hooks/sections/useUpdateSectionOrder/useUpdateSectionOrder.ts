import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { SectionDetails } from '../types'

interface UpdateSectionOrdersRequest {
    tripId: string
    request: SectionDetails[]
}

export const useUpdateSectionOrder = () => {

    const updateOrders = useCallback(async ({ tripId, request }: UpdateSectionOrdersRequest) => {
        await webClient.put(`/v1/trips/${tripId}/sections`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateSectionOrder],
        mutationFn: updateOrders
    })
}