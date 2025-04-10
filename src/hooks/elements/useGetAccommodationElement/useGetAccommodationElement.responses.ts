import { ACCOMMODATION_1, ACCOMMODATION_2, S1_OPTION_1_ID, S2_OPTION_1_ID } from 'testUtils/mockValues'
import { AccommodationElementDetails, AccommodationType, ElementStatus, ElementType } from '../types'

export const useGetAccommodationElementPairResponses: Record<string, AccommodationElementDetails[]> = {
    [ACCOMMODATION_1]: [
        {
            baseElementID: ACCOMMODATION_1,
            optionID: S1_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            order: 2,
            place: 'Cozy Mountain Lodge',
            location: 'Aspen, Colorado',
            accommodationType: AccommodationType.CHECK_IN,
            dateTime: '2025-04-20T15:00:00Z',
            link: 'https://example.com/hotel',
            price: 199.99,
            notes: 'Check-in after 3 PM',
            status: ElementStatus.PENDING
        },
        {
            baseElementID: ACCOMMODATION_1,
            optionID: S1_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            order: 4,
            place: 'Cozy Mountain Lodge',
            location: 'Aspen, Colorado',
            accommodationType: AccommodationType.CHECK_OUT,
            dateTime: '2025-04-23T15:00:00Z',
            link: 'https://example.com/hotel',
            price: 199.99,
            notes: 'Check-in after 3 PM',
            status: ElementStatus.PENDING
        }
    ],
    [ACCOMMODATION_2]: [
        {
            baseElementID: ACCOMMODATION_2,
            optionID: S2_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            order: 1,
            place: 'Cozy Mountain Lodge',
            accommodationType: AccommodationType.CHECK_IN,
            dateTime: '2025-04-20T15:00:00Z'
        },
        {
            baseElementID: ACCOMMODATION_2,
            optionID: S2_OPTION_1_ID,
            lastUpdatedAt: '2025-04-07T12:00:00Z',
            elementType: ElementType.ACCOMMODATION,
            order: 5,
            place: 'Cozy Mountain Lodge',
            accommodationType: AccommodationType.CHECK_OUT,
            dateTime: '2025-04-23T15:00:00Z',
        }
    ]
}