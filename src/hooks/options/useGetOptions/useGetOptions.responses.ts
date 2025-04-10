import { OptionDetails } from '../types'
import { S1_OPTION_1_ID, S1_OPTION_2_ID, S2_OPTION_1_ID, SECTION_1_ID, SECTION_2_ID } from 'testUtils/mockValues'
import { useGetOptionResponses } from '../useGetOption'

export const useGetOptionsResponses: Record<string, OptionDetails[]> = {
    [SECTION_1_ID]: [
        useGetOptionResponses[S1_OPTION_1_ID],
        useGetOptionResponses[S1_OPTION_2_ID],
    ],
    [SECTION_2_ID]: [
        useGetOptionResponses[S2_OPTION_1_ID]
    ]
}