import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { OptionArgs, OptionDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetOption = () => {

    const getOption = useCallback( async ({ sectionId, optionId }: OptionArgs) => {
        const { data } = await webClient.get<OptionDetails>(`/v1/sections/${sectionId}/options/${optionId}`)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.getOption],
        mutationFn: getOption
    })
}