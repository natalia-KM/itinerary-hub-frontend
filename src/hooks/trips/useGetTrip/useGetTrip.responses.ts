import { TripDO } from './types'
import { useGetTripDetailsResponses } from '../useGetTripDetails/useGetTripDetails.responses'
import {
    ACCOMMODATION_1, ACCOMMODATION_2, ACTIVITY_1, ACTIVITY_2, ACTIVITY_3,
    S1_OPTION_1_ID,
    S1_OPTION_2_ID,
    S2_OPTION_1_ID,
    SECTION_1_ID,
    SECTION_2_ID, TRANSPORT_1, TRANSPORT_2, TRANSPORT_3,
    TRIP_ID, TRIP_ID_2, TRIP_ID_3
} from 'testUtils/mockValues'
import { useGetSectionResponses } from 'hooks/sections'
import { useGetOptionResponses } from 'hooks/options'
import {
    useGetAccommodationElementPairResponses,
    useGetActivityElementResponses,
    useGetTransportElementResponses
} from 'hooks/elements'

export const useGetTripResponses: Record<string, TripDO> = {
    [TRIP_ID]: {
        tripDetails: useGetTripDetailsResponses[TRIP_ID],
        sections: [
            {
                sectionDetails: useGetSectionResponses[SECTION_1_ID],
                options: [
                    {
                        optionDetails: useGetOptionResponses[S1_OPTION_1_ID],
                        baseElementDetails: [
                            useGetTransportElementResponses[TRANSPORT_1],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                            useGetActivityElementResponses[ACTIVITY_1],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_1][1]
                        ]
                    },
                    {
                        optionDetails: useGetOptionResponses[S1_OPTION_2_ID],
                        baseElementDetails: [
                            useGetTransportElementResponses[TRANSPORT_2]
                        ]
                    }
                ]
            },
            {
                sectionDetails: useGetSectionResponses[SECTION_2_ID],
                options: [
                    {
                        optionDetails: useGetOptionResponses[S2_OPTION_1_ID],
                        baseElementDetails: [
                            useGetAccommodationElementPairResponses[ACCOMMODATION_2][0],
                            useGetTransportElementResponses[TRANSPORT_3],
                            useGetActivityElementResponses[ACTIVITY_2],
                            useGetActivityElementResponses[ACTIVITY_3],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_2][1]
                        ]
                    }
                ]
            }
        ]
    },
    [TRIP_ID_2]: {
        tripDetails: useGetTripDetailsResponses[TRIP_ID_2],
        sections: [
            {
                sectionDetails: useGetSectionResponses[SECTION_1_ID],
                options: [
                    {
                        optionDetails: useGetOptionResponses[S1_OPTION_1_ID],
                        baseElementDetails: [
                            useGetTransportElementResponses[TRANSPORT_1],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                            useGetActivityElementResponses[ACTIVITY_1],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_1][1]
                        ]
                    },
                    {
                        optionDetails: useGetOptionResponses[S1_OPTION_2_ID],
                        baseElementDetails: [
                            useGetTransportElementResponses[TRANSPORT_2]
                        ]
                    }
                ]
            },
            {
                sectionDetails: useGetSectionResponses[SECTION_2_ID],
                options: [
                    {
                        optionDetails: useGetOptionResponses[S2_OPTION_1_ID],
                        baseElementDetails: [
                            useGetAccommodationElementPairResponses[ACCOMMODATION_2][0],
                            useGetTransportElementResponses[TRANSPORT_3],
                            useGetActivityElementResponses[ACTIVITY_2],
                            useGetActivityElementResponses[ACTIVITY_3],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_2][1]
                        ]
                    }
                ]
            }
        ]
    },
    [TRIP_ID_3]: {
        tripDetails: useGetTripDetailsResponses[TRIP_ID_2],
        sections: [
            {
                sectionDetails: useGetSectionResponses[SECTION_1_ID],
                options: [
                    {
                        optionDetails: useGetOptionResponses[S1_OPTION_1_ID],
                        baseElementDetails: [
                            useGetTransportElementResponses[TRANSPORT_1],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                            useGetActivityElementResponses[ACTIVITY_1],
                            useGetAccommodationElementPairResponses[ACCOMMODATION_1][1]
                        ]
                    },
                    {
                        optionDetails: useGetOptionResponses[S1_OPTION_2_ID],
                        baseElementDetails: [
                            useGetTransportElementResponses[TRANSPORT_2]
                        ]
                    }
                ]
            }
        ]
    }
}