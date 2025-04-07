import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { OptionDetails } from '../types'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetOptions = (sectionId: string) => {
    
    const getOptions = useCallback(async () => {
        const { data } = await webClient.get<OptionDetails[]>(`/v1/sections/${sectionId}/options`)
        return data
    }, [sectionId])
    
    return useQuery({
        queryKey: [queryKeys.getOptions, sectionId],
        queryFn: getOptions,
        refetchOnMount: true
    })
}