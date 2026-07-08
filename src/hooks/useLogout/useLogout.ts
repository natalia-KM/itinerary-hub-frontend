import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useLogout = () => {

    const logout = useCallback(async () => {
        await webClient.get('/logout').then((result) => {
            if(result.status === 204) {
                // Deliberate full-page redirect: it drops the react-query cache
                // so no user data survives the logout.
                window.location.href = '/login'
            }
        })
    }, [])

    return useMutation({
        mutationKey: [queryKeys.logout],
        mutationFn: logout
    })
}