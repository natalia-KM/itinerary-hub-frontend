import { UserDetails } from './types'

export const useGetUserDetailsResponses: Record<string, UserDetails> = {
    Guest: {
        firstName: 'John',
        lastName: 'Doe',
        isGuest: true,
        createdAt: '2025-03-10T00:00:00',
        currency: null
    },
    Google: {
        firstName: 'Anna',
        lastName: 'Delve',
        isGuest: false,
        createdAt: '2025-03-10T00:00:00',
        currency: 'USD'
    }
}