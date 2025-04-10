import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { OptionArgs } from '../types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useDeleteOption = () => {

    const deleteOption = useCallback( async ({ sectionId, optionId }: OptionArgs) => {
        await webClient.delete(`/v1/sections/${sectionId}/options/${optionId}`)
    }, [])

    return useMutation({
        mutationKey: [queryKeys.deleteOption],
        mutationFn: deleteOption
    })
}