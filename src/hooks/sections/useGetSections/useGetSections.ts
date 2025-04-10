import webClient from 'config/clientConfig'
import { SectionDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getSections = async (tripId: string) => {
    const { data } = await webClient.get<SectionDetails[]>(`/v1/trips/${tripId}/sections`)
    return data
}

export const useGetSections = (tripId: string) => {

    return useMutation({
        mutationKey: [queryKeys.getSections, tripId],
        mutationFn: () => getSections(tripId)
    })

}