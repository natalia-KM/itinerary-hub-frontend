import { useCallback } from 'react'
import { GetElementRequest, TransportElementDetails } from '../types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetTransportElement = (baseElementId: string) => {

    const getTransportElement = useCallback(async ({
        sectionId,
        optionId
    }: GetElementRequest) => {
        const { data } = await webClient.get<TransportElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/transport`)
        return data
    }, [baseElementId])

    return useMutation({
        mutationKey: [queryKeys.getTransportElement, baseElementId],
        mutationFn: getTransportElement
    })
}