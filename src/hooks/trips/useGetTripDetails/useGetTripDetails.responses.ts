import { TRIP_ID, TRIP_ID_2 } from 'testUtils/mockValues'
import { TripDetails } from 'utils'

export const useGetTripDetailsResponses: Record<string, TripDetails> = {
    [TRIP_ID]: {
        tripId: TRIP_ID,
        tripName: 'US Trip',
        createdAt: new Date('2025-03-22T00:00:00'),
        imageRef: 'trip-1',
        startDate: new Date('2025-03-24T00:00:00'),
        endDate: new Date('2025-03-28T00:00:00')
    },
    [TRIP_ID_2]: {
        tripId: TRIP_ID_2,
        tripName: 'Canada Trip',
        createdAt: new Date('2025-03-22T00:00:00'),
        imageRef: 'trip-1',
        startDate: new Date('2025-03-24T00:00:00')
    }
}