import React, { useEffect, useState } from 'react'
import { useGetUserDetails } from 'hooks/useGetUserDetails/useGetUserDetails'
import { UserDetails } from 'hooks/useGetUserDetails/types'
import { UserDetailsContext } from 'provider/UserDetailsProvider/UserDetailsContext'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

interface UserDetailsProviderProps {
    children: React.ReactNode
}

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
    const { mutateAsync: getUserDetails } = useGetUserDetails()
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const queryClient = useQueryClient()

    useEffect(() => {
        const hasCookies = document.cookie && document.cookie.length > 0

        if (hasCookies) {
            getUserDetails().then((response) => {
                setUserDetails(response)
                if(window.location.pathname === '/login' || window.location.pathname === '/') {
                    window.location.href = '/dashboard'
                }
            }).catch(() => {
                if(window.location.pathname !== '/login') {
                    window.location.href = '/login'
                }
            })
        } else {
            if(window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }
    }, [getUserDetails])

    const invalidateUserDetails = () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.getUserDetails] })
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, invalidateUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    )
}