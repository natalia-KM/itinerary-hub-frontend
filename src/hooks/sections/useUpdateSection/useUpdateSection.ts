import { useCallback } from 'react'
import { UpdateSectionRequest } from './types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useUpdateSection = () => {

    const updateSection = useCallback(async ({ request, tripId, sectionId }: UpdateSectionRequest) => {
       await webClient.put(`/v1/trips/${tripId}/sections/${sectionId}`, request)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateSection],
        mutationFn: updateSection
    })
}