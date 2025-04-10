import { useCallback } from 'react'
import { CreateOptionRequest } from './types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useCreateOption = () => {

    const createOption = useCallback(async ({ tripId, sectionId, request }: CreateOptionRequest) => {
        await webClient.post(`/v1/trips/${tripId}/sections/${sectionId}/options`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.createOption],
        mutationFn: createOption
    })
}