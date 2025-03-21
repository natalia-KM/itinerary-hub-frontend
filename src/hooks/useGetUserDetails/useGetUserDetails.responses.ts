import { UserDetails } from './types'

export const useGetUserDetailsResponses: Record<string, UserDetails> = {
    Guest: {
        firstName: 'John',
        lastName: 'Doe',
        isGuest: true,
        currency: null
    },
    Google: {
        firstName: 'Anna',
        lastName: 'Delve',
        isGuest: false,
        currency: 'USD'
    }
}