import webClient from 'config/clientConfig'
import { ActivityElementDetails, GetElementRequest } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getActivityElement = (async ({
    sectionId,
    optionId,
    baseElementId
}: GetElementRequest) => {
    const { data } = await webClient.get<ActivityElementDetails>(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}/activity`)
    return data
})

export const useGetActivityElement = ({
    sectionId,
    optionId,
    baseElementId
}: GetElementRequest) => {

    return useMutation({
        mutationKey: [queryKeys.getActivityElement, baseElementId],
        mutationFn: () => getActivityElement({ sectionId, optionId, baseElementId })
    })
}