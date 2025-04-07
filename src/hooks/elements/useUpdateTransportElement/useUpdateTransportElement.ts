import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { TransportElementDetails } from '../types'
import { UpdateTransportElementRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateTransportElement = () => {

    const updateTransportElement = useCallback(async ({
        sectionId,
        optionId,
        baseElementId,
        request
    }: UpdateTransportElementRequest) => {
        const { data } = await webClient.put<TransportElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/transpot`, request)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateTransportElement],
        mutationFn: updateTransportElement
    })
}