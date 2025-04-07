import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { UpdateActivityRequest } from './types'
import { ActivityElementDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateActivityElement = () => {

    const updateActivityElement = useCallback(async ({
        sectionId,
        optionId,
        baseElementId,
        request
    }: UpdateActivityRequest) => {
        const { data } = await webClient.put<ActivityElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/activity`, request)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateActivityElement],
        mutationFn: updateActivityElement
    })
}