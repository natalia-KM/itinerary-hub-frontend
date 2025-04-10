import { SectionDetails } from '../types'

import { useGetSectionResponses } from '../useGetSection'
import { SECTION_1_ID, SECTION_2_ID, TRIP_ID } from 'testUtils/mockValues'

export const useGetSectionsResponses: Record<string, SectionDetails[]> = {
    [TRIP_ID]: [
        useGetSectionResponses[SECTION_1_ID],
        useGetSectionResponses[SECTION_2_ID]
    ]
}