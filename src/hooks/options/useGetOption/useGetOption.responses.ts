import { OptionDetails } from '../types'
import { S1_OPTION_1_ID, S1_OPTION_2_ID, S2_OPTION_1_ID } from 'testUtils/mockValues'

export const useGetOptionResponses: Record<string, OptionDetails> = {
    [S1_OPTION_1_ID]: {
        optionId: S1_OPTION_1_ID,
        optionName: 'Option 1',
        order: 1
    },
    [S1_OPTION_2_ID]: {
        optionId: S1_OPTION_2_ID,
        optionName: 'Option 2',
        order: 2
    },
    [S2_OPTION_1_ID]: {
        optionId: S2_OPTION_1_ID,
        optionName: 'Option 1',
        order: 1
    },
}