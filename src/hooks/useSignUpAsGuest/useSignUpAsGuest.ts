import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { GuestUserDetails } from './types'

export const useSignUpAsGuest = () => {

    const signUp = useCallback(async ({ firstName, lastName }: GuestUserDetails) => {
        await webClient.post('/v1/users/guest',
            {
                firstName: firstName,
                lastName: lastName
            }).then(() => {
                window.location.href = '/dashboard'
        })
    }, [])

    return useMutation({
        mutationKey: [queryKeys.signUpAsGuest],
        mutationFn: signUp
    })
}