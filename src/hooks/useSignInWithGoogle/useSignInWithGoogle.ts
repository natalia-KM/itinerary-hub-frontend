import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { BASE_API_PATH } from 'config/envConfig'


export const useSignInWithGoogle = () => {

    const signIn = useCallback(async () => {
          window.location.href = `${BASE_API_PATH}/oauth2/authorization/google`
    }, [])

    return useMutation({
        mutationKey: [queryKeys.signInWithGoogle],
        mutationFn: signIn
    })
}