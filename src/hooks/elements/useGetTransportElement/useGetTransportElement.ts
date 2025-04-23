import { GetElementRequest, TransportElementDetails } from '../types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getTransportElement = (async ({
    sectionId,
    optionId,
    baseElementId
}: GetElementRequest) => {
    const { data } = await webClient.get<TransportElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/transport`)
    return data
})

export const useGetTransportElement = ({
    sectionId,
    optionId,
    baseElementId
}: GetElementRequest) => {

    return useMutation({
        mutationKey: [queryKeys.getTransportElement, baseElementId],
        mutationFn: () => getTransportElement({ sectionId, optionId, baseElementId })
    })
}