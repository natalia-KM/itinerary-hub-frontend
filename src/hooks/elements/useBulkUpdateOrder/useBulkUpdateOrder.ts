import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { ElementType } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export interface ElementOrderUpdateRow {
    elementId: string // for acc elements, this should be eventId
    elementType: ElementType
    order: number
}
    
export const useBulkUpdateOrder = () => {

    const updateElementsOrder = useCallback(async (request: ElementOrderUpdateRow[]) => {
        await webClient.put('/v1/elements', request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.bulkUpdateElementOrder],
        mutationFn: updateElementsOrder
    })
}