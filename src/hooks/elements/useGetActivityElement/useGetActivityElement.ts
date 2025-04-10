import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { ActivityElementDetails, GetElementRequest } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetActivityElement = (baseElementId: string) => {

    const getActivityElement = useCallback(async ({
        sectionId,
        optionId
    }: GetElementRequest) => {
        const { data } = await webClient.get<ActivityElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/activity`)
        return data
    }, [baseElementId])

    return useMutation({
        mutationKey: [queryKeys.getActivityElement, baseElementId],
        mutationFn: getActivityElement
    })
}