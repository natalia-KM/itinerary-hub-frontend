import webClient from 'config/clientConfig'
import { OptionDetails } from '../types'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getOptions = (async (sectionId: string) => {
    const { data } = await webClient.get<OptionDetails[]>(`/v1/sections/${sectionId}/options`)
    return data
})

export const useGetOptions = (sectionId: string) => {
    
    return useQuery({
        queryKey: [queryKeys.getOptions, sectionId],
        queryFn: () => getOptions(sectionId),
        refetchOnMount: true
    })
}