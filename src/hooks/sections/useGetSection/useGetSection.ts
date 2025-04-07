import { useCallback } from 'react'
import { SectionArgs, SectionDetails } from '../types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetSection = () => {

    const getSection = useCallback( async  ({ tripId, sectionId }: SectionArgs) => {
        const { data } = await webClient.get<SectionDetails>(`/v1/trips/${tripId}/sections/${sectionId}`)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.getSection],
        mutationFn: getSection
    })
}