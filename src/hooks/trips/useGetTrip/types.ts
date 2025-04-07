import { AccommodationElementDetails, ActivityElementDetails, TransportElementDetails } from 'hooks/elements'
import { OptionDetails } from 'hooks/options'
import { SectionDetails } from 'hooks/sections'
import { TripDetails } from 'utils'

export type ElementDO = AccommodationElementDetails | ActivityElementDetails | TransportElementDetails

export interface OptionDO {
    optionDetails: OptionDetails
    baseElementDetails: ElementDO[]
}

export interface SectionDO {
    sectionDetails: SectionDetails
    options: OptionDO[]
}

export interface TripDO {
    tripDetails: TripDetails
    sections: SectionDO[]
}

export interface GetTripRequest {
    tripId: string
}