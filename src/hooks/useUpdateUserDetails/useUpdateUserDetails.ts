import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { UserDetails } from 'hooks/useGetUserDetails/types'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

interface UpdateUserDetailsRequest {
    firstName?: string,
    lastName?: string,
    currency?: string
}

export const useUpdateUserDetails = () => {

    const updateUserDetails = useCallback(async (request: UpdateUserDetailsRequest) => {
        const { data } = await webClient.put<UserDetails>('/v1/users', {
            ...request
        })
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.updateUserDetails],
        mutationFn: updateUserDetails
    })
}