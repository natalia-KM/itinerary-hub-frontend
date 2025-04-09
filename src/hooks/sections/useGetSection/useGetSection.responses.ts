import { SectionDetails } from '../types'
import { SECTION_1_ID, SECTION_2_ID } from 'testUtils/mockValues'

export const useGetSectionResponses: Record<string, SectionDetails> = {
    [SECTION_1_ID]: {
        sectionId: SECTION_1_ID,
        sectionName: 'Section 1',
        order: 1
    },
    [SECTION_2_ID]: {
        sectionId: SECTION_2_ID,
        sectionName: 'Section 2',
        order: 2
    }
}