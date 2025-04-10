import { ElementStatus, ElementType, TransportElementDetails } from '../types'
import { S1_OPTION_1_ID, S1_OPTION_2_ID, S2_OPTION_1_ID, TRANSPORT_1, TRANSPORT_2, TRANSPORT_3 } from 'testUtils/mockValues'

export const useGetTransportElementResponses: Record<string, TransportElementDetails> = {
    [TRANSPORT_1]: {
        baseElementID: TRANSPORT_1,
        optionID: S1_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        status: ElementStatus.PENDING,
        order: 1,
        originPlace: 'London Heathrow Airport (LHR)',
        destinationPlace: 'John F. Kennedy Airport (JFK)',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z',
        provider: 'British Airways',
        link: 'https://britishairways.com/booking/123',
        price: 420,
        notes: 'Check-in 2 hours before departure.'
    },
    [TRANSPORT_2]: {
        baseElementID: TRANSPORT_2,
        optionID: S1_OPTION_2_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        status: ElementStatus.PENDING,
        order: 2,
        originPlace: 'London Heathrow Airport (LHR)',
        destinationPlace: 'John F. Kennedy Airport (JFK)',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z',
        link: 'https://britishairways.com/booking/123',
        price: 420,
    },
    [TRANSPORT_3]: {
        baseElementID: TRANSPORT_3,
        optionID: S2_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        status: ElementStatus.PENDING,
        order: 2,
        originPlace: 'London Heathrow Airport (LHR)',
        destinationPlace: 'John F. Kennedy Airport (JFK)',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z'
    }
}