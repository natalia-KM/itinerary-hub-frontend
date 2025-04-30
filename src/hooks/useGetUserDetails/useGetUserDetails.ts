import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserDetails } from 'hooks/useGetUserDetails/types'
import { queryKeys } from 'config/queryKeys'

export const useGetUserDetails = () => {

    const getUserDetails = useCallback(async () => {
        const { data } = await webClient.get<UserDetails>('/v1/users')
        return data
    }, [])

    return useQuery<UserDetails>({
        queryKey: [queryKeys.getUserDetails],
        queryFn: getUserDetails
    })
}