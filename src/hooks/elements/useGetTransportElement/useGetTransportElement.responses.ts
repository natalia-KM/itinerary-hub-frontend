import { ElementStatus, ElementType, TransportElementDetails } from '../types'
import {
    S1_OPTION_1_ID,
    S1_OPTION_2_ID,
    S2_OPTION_1_ID,
    TRANSPORT_1,
    TRANSPORT_2,
    TRANSPORT_3,
    TRANSPORT_4
} from 'testUtils/mockValues'

export const useGetTransportElementResponses: Record<string, TransportElementDetails> = {
    [TRANSPORT_1]: {
        baseElementID: TRANSPORT_1,
        elementID: TRANSPORT_1,
        optionID: S1_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        elementCategory: 'Flight',
        status: ElementStatus.PENDING,
        order: 1,
        originPlace: 'London Heathrow Airport (LHR)',
        destinationPlace: 'John F. Kennedy Airport (JFK)',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z',
        provider: 'British Airways',
        link: 'https://britishairways.com/booking/123',
        price: 420,
        notes: 'Check-in 2 hours before departure.',
        passengerDetailsList: []
    },
    [TRANSPORT_2]: {
        baseElementID: TRANSPORT_2,
        elementID: TRANSPORT_2,
        optionID: S1_OPTION_2_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        elementCategory: 'Flight',
        status: ElementStatus.PENDING,
        order: 2,
        originPlace: 'London Heathrow Airport (LHR)',
        destinationPlace: 'John F. Kennedy Airport (JFK)',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z',
        link: 'https://britishairways.com/booking/123',
        price: 420,
        passengerDetailsList: []
    },
    [TRANSPORT_3]: {
        baseElementID: TRANSPORT_3,
        elementID: TRANSPORT_3,
        optionID: S2_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        elementCategory: 'Flight',
        status: ElementStatus.PENDING,
        order: 2,
        originPlace: 'London Heathrow Airport (LHR)',
        destinationPlace: 'John F. Kennedy Airport (JFK)',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z',
        passengerDetailsList: []
    },
    [TRANSPORT_4]: { // not used in default response
        baseElementID: TRANSPORT_4,
        elementID: TRANSPORT_4,
        optionID: S1_OPTION_2_ID,
        lastUpdatedAt: '2025-04-07T15:30:00Z',
        elementType: ElementType.TRANSPORT,
        elementCategory: 'Custom Transport',
        status: ElementStatus.CANCELLED,
        order: 2,
        originPlace: 'London Heathrow',
        destinationPlace: 'JFK',
        originDateTime: '2025-06-10T08:45:00Z',
        destinationDateTime: '2025-06-10T11:30:00Z',
        passengerDetailsList: []
    }
}