import { useCallback } from 'react'
import { UpdateOptionRequest } from './types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateOption = () => {

    const updateOption = useCallback(async ({
        sectionId,
        optionId,
        request
    }: UpdateOptionRequest) => {
        await webClient.put(`/v1/sections/${sectionId}/options/${optionId}`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateOption],
        mutationFn: updateOption
    })
}