import webClient from 'config/clientConfig'
import { SectionDetails } from '../types'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getSections = async (tripId: string) => {
    const { data } = await webClient.get<SectionDetails[]>(`/v1/trips/${tripId}/sections`)
    return data
}

export const useGetSections = (tripId: string) => {

    return useQuery({
        queryKey: [queryKeys.getSections, tripId],
        queryFn: () => getSections(tripId)
    })

}