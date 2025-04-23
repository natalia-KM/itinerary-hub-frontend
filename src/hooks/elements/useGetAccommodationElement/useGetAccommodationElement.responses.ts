import { ACCOMMODATION_1, ACCOMMODATION_2, PASSENGER_1, S1_OPTION_1_ID, S2_OPTION_1_ID } from 'testUtils/mockValues'
import { AccommodationElementDetails, AccommodationType, ElementStatus, ElementType } from '../types'
import { useGetPassengerResponses } from 'hooks/passengers/useGetPassenger/useGetPassenger.responses'

export const useGetAccommodationElementPairResponses: Record<string, AccommodationElementDetails[]> = {
    [ACCOMMODATION_1]: [
        {
            baseElementID: ACCOMMODATION_1,
            elementID: 'acc-element-1',
            optionID: S1_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            elementCategory: 'Hotel',
            order: 2,
            place: 'Cozy Mountain Lodge',
            location: 'Aspen, Colorado',
            accommodationType: AccommodationType.CHECK_IN,
            dateTime: '2025-04-20T15:00:00Z',
            link: 'https://example.com/hotel',
            price: 199.99,
            notes: 'Check-in after 3 PM',
            status: ElementStatus.PENDING,
            passengerDetailsList: []
        },
        {
            baseElementID: ACCOMMODATION_1,
            elementID: 'acc-element-2',
            optionID: S1_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            elementCategory: 'Hotel',
            order: 4,
            place: 'Cozy Mountain Lodge',
            location: 'Aspen, Colorado',
            accommodationType: AccommodationType.CHECK_OUT,
            dateTime: '2025-04-23T15:00:00Z',
            link: 'https://example.com/hotel',
            price: 199.99,
            notes: 'Check-in after 3 PM',
            status: ElementStatus.PENDING,
            passengerDetailsList: []
        }
    ],
    [ACCOMMODATION_2]: [
        {
            baseElementID: ACCOMMODATION_2,
            elementID: 'acc-element-3',
            optionID: S2_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            elementCategory: 'AirBnb',
            order: 1,
            place: 'Cozy Mountain Lodge',
            accommodationType: AccommodationType.CHECK_IN,
            dateTime: '2025-04-20T15:00:00Z',
            passengerDetailsList: [
                useGetPassengerResponses[PASSENGER_1]
            ]
        },
        {
            baseElementID: ACCOMMODATION_2,
            elementID: 'acc-element-4',
            optionID: S2_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            elementCategory: 'AirBnb',
            order: 5,
            place: 'Cozy Mountain Lodge',
            accommodationType: AccommodationType.CHECK_OUT,
            dateTime: '2025-04-23T15:00:00Z',
            passengerDetailsList: [
                useGetPassengerResponses[PASSENGER_1]
            ]
        }
    ]
}