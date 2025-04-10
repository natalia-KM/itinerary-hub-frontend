import { ActivityElementDetails, ElementStatus, ElementType } from '../types'
import { ACTIVITY_1, ACTIVITY_2, ACTIVITY_3, S1_OPTION_1_ID, S2_OPTION_1_ID } from 'testUtils/mockValues'

export const useGetActivityElementResponses: Record<string, ActivityElementDetails> = {
    [ACTIVITY_1]: {
        baseElementID: ACTIVITY_1,
        optionID: S1_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T12:00:00Z',
        elementType: ElementType.ACTIVITY,
        status: ElementStatus.BOOKED,
        order: 3,
        activityName: 'Snorkeling Adventure',
        location: 'Great Barrier Reef, Australia',
        startsAt: '2025-05-01T09:00:00Z',
        duration: 120,
        link: 'https://example.com/snorkeling-tour',
        price: 75,
        notes: 'Bring your own sunscreen.'
    },
    [ACTIVITY_2]: {
        baseElementID: ACTIVITY_2,
        optionID: S2_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T12:00:00Z',
        elementType: ElementType.ACTIVITY,
        status: ElementStatus.BOOKED,
        order: 3,
        activityName: 'Snorkeling Adventure',
        location: 'Great Barrier Reef, Australia',
        startsAt: '2025-05-01T09:00:00Z',
    },
    [ACTIVITY_3]: {
        baseElementID: ACTIVITY_3,
        optionID: S2_OPTION_1_ID,
        lastUpdatedAt: '2025-04-07T12:00:00Z',
        elementType: ElementType.ACTIVITY,
        status: ElementStatus.BOOKED,
        order: 4,
        activityName: 'Snorkeling Adventure',
        location: 'Great Barrier Reef, Australia'
    }
}