import { useCallback } from 'react'
import { CreateSectionRequest } from './types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useCreateSection = () => {

    const createSection = useCallback(async ({ tripId, request }: CreateSectionRequest) => {
        await webClient.post(`/v1/trips/${tripId}/sections`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.createSection],
        mutationFn: createSection
    })
}