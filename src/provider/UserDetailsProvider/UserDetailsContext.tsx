import { createContext } from 'react'
import { UserDetails } from 'hooks/useGetUserDetails/types'

export type UserDetailsContextType = {
    userDetails?: UserDetails,
    invalidateUserDetails: () => void
}

export const UserDetailsContext = createContext<UserDetailsContextType | null>(null)
