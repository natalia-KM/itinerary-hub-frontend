import { useCallback } from 'react'
import { CreateAccommElementRequest } from './types'
import webClient from 'config/clientConfig'
import { AccommodationElementDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useCreateAccommodationElement = () => {

    const createAccommElement = useCallback(async ({
        request,
        sectionId,
        optionId
    }: CreateAccommElementRequest) => {
        const { data } = await webClient.post<AccommodationElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/accommodation`, request)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.createAccommodationElement],
        mutationFn: createAccommElement
    })
}