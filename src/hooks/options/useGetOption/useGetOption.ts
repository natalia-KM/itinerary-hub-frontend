import webClient from 'config/clientConfig'
import { OptionArgs, OptionDetails } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const getOption = ( async ({ sectionId, optionId }: OptionArgs) => {
    const { data } = await webClient.get<OptionDetails>(`/v1/sections/${sectionId}/options/${optionId}`)
    return data
})

export const useGetOption = ({ sectionId, optionId }: OptionArgs) => {

    return useMutation({
        mutationKey: [queryKeys.getOption],
        mutationFn: () => getOption({ sectionId, optionId })
    })
}