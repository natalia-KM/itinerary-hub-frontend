import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { UserDetails } from 'hooks/useGetUserDetails/types'
import { queryKeys } from 'config/queryKeys'

export const useGetUserDetails = () => {

    const getUserDetails = useCallback(async () => {
        const { data } = await webClient.get<UserDetails>('/v1/users')
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.getUserDetails],
        mutationFn: getUserDetails
    })
}