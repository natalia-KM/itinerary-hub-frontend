import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useDeleteAccount = () => {

    const deleteAccount = useCallback(async () => {
        await webClient.delete('/v1/users').then(() => {
            // Deliberate full-page redirect: it drops the react-query cache
            // so no user data survives the account deletion.
            window.location.href = '/login'
        })
    }, [])

    return useMutation({
        mutationKey: [queryKeys.deleteUser],
        mutationFn: deleteAccount
    })
}