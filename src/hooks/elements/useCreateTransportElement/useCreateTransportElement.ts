import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { CreateTransportElementRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { TransportElementDetails } from '../types'

export const useCreateTransportElement = () => {

    const createTransportElement = useCallback(async ({
        request,
        sectionId,
        optionId
    }: CreateTransportElementRequest) => {
        const { data } = await webClient.post<TransportElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/transport`, request)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.createTransportElement],
        mutationFn: createTransportElement
    })
}