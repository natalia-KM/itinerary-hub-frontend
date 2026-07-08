import React, { useEffect } from 'react'
import { useGetUserDetails } from 'hooks/useGetUserDetails/useGetUserDetails'
import { UserDetailsContext } from 'provider/UserDetailsProvider/UserDetailsContext'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

interface UserDetailsProviderProps {
    children: React.ReactNode
}

// Pages that are viewable without being logged in.
const PUBLIC_PATHS = ['/login', '/privacy-policy', '/help']

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
    const { data: userDetails, isSuccess, isError } = useGetUserDetails()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (isSuccess && (window.location.pathname === '/' || window.location.pathname === '/login')) {
            window.location.href = '/dashboard'
        }

        if (isError && !PUBLIC_PATHS.includes(window.location.pathname)) {
            window.location.href = '/login'
        }
    }, [isSuccess, isError])

    const invalidateUserDetails = async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.getUserDetails] })
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, invalidateUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    )
}