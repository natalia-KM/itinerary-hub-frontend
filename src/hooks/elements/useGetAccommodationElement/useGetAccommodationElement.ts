import { GetAcommElementRequest } from './types'
import webClient from 'config/clientConfig'
import { AccommodationElementDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getAccommodationElement = (async({
    sectionId,
    optionId,
    baseElementId,
    type
}: GetAcommElementRequest) => {
    if(!type) {
        console.error('Type must be specified.')
        return
    }
    const requestParam = `?type=${type}`
    const { data } = await webClient.get<AccommodationElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/accommodation${requestParam}`)
    return data
})

export const useGetAccommodationElement = ({
    sectionId,
    optionId,
    baseElementId,
    type
}: GetAcommElementRequest) => {

    return useMutation({
        mutationKey: [queryKeys.getAccommodationElement, baseElementId],
        mutationFn: () => getAccommodationElement({ sectionId, optionId, baseElementId, type })
    })
}