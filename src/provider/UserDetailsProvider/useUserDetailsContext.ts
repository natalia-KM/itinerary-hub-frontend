import { useContext } from 'react'
import { UserDetailsContext, UserDetailsContextType } from './UserDetailsContext'

export const useUserDetailsContext = () => useContext(UserDetailsContext) as UserDetailsContextType