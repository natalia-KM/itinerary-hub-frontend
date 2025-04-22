import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { ElementDO } from 'hooks/trips'

export const getElements = (async (optionId: string) => {
    const { data } = await webClient.get<ElementDO[]>(`/v1/options/${optionId}/elements`)
    return data
})

export const useGetElements = (optionId: string) => {

    return useMutation({
        mutationKey: [queryKeys.getElements, optionId],
        mutationFn: () => getElements(optionId)
    })
}