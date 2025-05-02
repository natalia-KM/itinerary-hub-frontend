import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { DeleteElementRequest } from './types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useDeleteElement = () => {

    const deleteElement = useCallback(async ({
        sectionId,
        optionId,
        baseElementId,
        elementType
    }: DeleteElementRequest) => {
        const requestParam = `?type=${elementType}`
        await webClient.delete(`/v1/sections/${sectionId}/options/${optionId}/elements/${baseElementId}${requestParam}`)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.deleteElement],
        mutationFn: deleteElement
    })
}