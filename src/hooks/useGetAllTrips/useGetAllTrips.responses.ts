import { GetAllTripsResponse } from './types'
import { TRIP_ID, TRIP_ID_2 } from 'testUtils/mockValues'

export const useGetAllTripsResponses: Record<string, GetAllTripsResponse> = {
    oneTrip: [
        {
            tripId: TRIP_ID,
            tripName: 'Paris Trip',
            createdAt: '2025-03-22T00:00:00',
            imageRef: 'image-1',
            startDate: '2025-03-24T00:00:00',
            endDate: '2025-03-28T00:00:00'
        }
    ],
    multipleTrips: [
        {
            tripId: TRIP_ID,
            tripName: 'Paris Trip',
            createdAt: '2025-03-22T00:00:00',
            imageRef: 'image-1',
            startDate: '2025-03-24T00:00:00',
            endDate: '2025-03-28T00:00:00'
        },
        {
            tripId: TRIP_ID_2,
            tripName: 'London Trip',
            createdAt: '2025-03-15T00:00:00',
            imageRef: 'image-1',
            startDate: undefined,
            endDate: undefined
        }
    ]
}