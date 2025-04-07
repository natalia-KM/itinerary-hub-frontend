import { useCallback } from 'react'
import { AccommElementsPair, UpdateAccommElementRequest } from './types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateAccommodationElement = () => {

    const updateAccommElement = useCallback(async ({
        sectionId,
        optionId,
        baseElementId,
        request
    }: UpdateAccommElementRequest) => {
        const { data } = await webClient.put<AccommElementsPair>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/accommodation`, request)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateAccommodationElement],
        mutationFn: updateAccommElement
    })
}