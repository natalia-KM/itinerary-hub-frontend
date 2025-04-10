import { SectionArgs, SectionDetails } from '../types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getSection = ( async  ({ tripId, sectionId }: SectionArgs) => {
    const { data } = await webClient.get<SectionDetails>(`/v1/trips/${tripId}/sections/${sectionId}`)
    return data
})

export const useGetSection = ({ tripId, sectionId }: SectionArgs) => {

    return useMutation({
        mutationKey: [queryKeys.getSection],
        mutationFn: () => getSection({ tripId, sectionId })
    })
}