import { CreateTripRequest } from './types'

export const useCreateTripRequests: Record<string, CreateTripRequest> = {
    validRequest: {
        tripName: 'Paris Trip',
        imageRef: 'trip-1',
        startDate: '2025-03-24T00:00:00',
        endDate: '2025-03-28T00:00:00'
    },
    withNullValues: {
        tripName: 'London Trip',
        imageRef: 'default',
        startDate: undefined,
        endDate: undefined
    }
}