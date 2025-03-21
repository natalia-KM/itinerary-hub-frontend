import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { GuestUserDetails } from './types'
import { toast } from 'react-toastify'

export const useSignUpAsGuest = () => {

    const signUp = useCallback(async ({ firstName, lastName }: GuestUserDetails) => {
        await webClient.post('/v1/users/guest',
            {
                firstName: firstName,
                lastName: lastName
            }).then(() => {
                window.location.href = '/dashboard'
        }).catch(() => {
            toast('Something went wrong! Unable to create a guest account.', {
                toastId: 'create-guest-error-toast'
            })
        })
    }, [])

    return useMutation({
        mutationKey: [queryKeys.signUpAsGuest],
        mutationFn: signUp
    })
}