import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { SectionArgs } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useDeleteSection = () => {

    const deleteSection = useCallback(async ({ tripId, sectionId }: SectionArgs) => {
        await webClient.delete(`/v1/trips/${tripId}/sections/${sectionId}`)
    },[])

    return useMutation({
        mutationKey: [queryKeys.deleteSection],
        mutationFn: deleteSection
    })
}