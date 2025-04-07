import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { CreateActivityRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { ActivityElementDetails } from '../types'

export const useCreateActivityElement = () => {

    const createActivityElement = useCallback( async ({
        request,
        sectionId,
        optionId
    }: CreateActivityRequest) => {
        const { data } = await webClient.post<ActivityElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/activity`, request)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.createActivityElement],
        mutationFn: createActivityElement
    })
}