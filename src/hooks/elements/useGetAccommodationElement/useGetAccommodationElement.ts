import { useCallback } from 'react'
import { GetAcommElementRequest } from './types'
import webClient from 'config/clientConfig'
import { AccommodationElementDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetAccommodationElement = (baseElementId: string) => {

    const getAccommodationElement = useCallback(async({
        sectionId,
        optionId,
        type
    }: GetAcommElementRequest) => {
        const requestParam = `?type=${type}`
        const { data } = await webClient.get<AccommodationElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/accommodation${requestParam}`)
         return data
    }, [baseElementId])

    return useMutation({
        mutationKey: [queryKeys.getAccommodationElement, baseElementId],
        mutationFn: getAccommodationElement
    })
}