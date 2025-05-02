import { GetElementRequest } from '../types'
import webClient from 'config/clientConfig'
import { ElementDO } from 'hooks/trips'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

/**
 * Only Accommodation element will return a list of 2
 */
export const getElement  = (async ({
    sectionId,
    optionId,
    baseElementId
}: GetElementRequest) => {
    const { data } = await webClient.get<ElementDO[]>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}`)
    return data
})

export const useGetElement = ({
    sectionId,
    optionId,
    baseElementId
}: GetElementRequest) => {

    return useMutation({
        mutationKey: [queryKeys.getTransportElement, baseElementId],
        mutationFn: () => getElement({ sectionId, optionId, baseElementId })
    })
}