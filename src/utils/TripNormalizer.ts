import { TripDetails } from './types'
import { BaseElementDetails } from '../hooks/elements'
import { TripDO } from '../hooks/trips/useGetTrip/types'
import { OptionDetails } from '../hooks/options'
import { SectionDetails } from '../hooks/sections'

export interface NormalizedTripDetails {
    tripDetails: TripDetails
    sectionIds: string[]
}

export interface NormalizedSection {
    sectionDetails: SectionDetails
    optionIds: string[]
}

export interface NormalizedOption {
    optionDetails: OptionDetails
    elementIds: string[]
}

export interface NormalizedTrip {
    trip: NormalizedTripDetails
    sections: Record<string, NormalizedSection>
    options: Record<string, NormalizedOption>
    elements: Record<string, BaseElementDetails>
}

export function normalizeTripData(tripData: TripDO) {
    const normalized: NormalizedTrip = {
        trip: { tripDetails: tripData.tripDetails, sectionIds: [] },
        sections: {},
        options: {},
        elements: {}
    }

    for (const section of tripData.sections) {
        normalized.trip.sectionIds.push(section.sectionDetails.sectionId)

        normalized.sections[section.sectionDetails.sectionId] = {
            sectionDetails: section.sectionDetails,
            optionIds: []
        }

        for (const option of section.options) {
            normalized.sections[section.sectionDetails.sectionId].optionIds.push(option.optionDetails.optionId)

            normalized.options[option.optionDetails.optionId] = {
                optionDetails: option.optionDetails,
                elementIds: []
            }

            for (const element of option.baseElementDetails) {
                normalized.options[option.optionDetails.optionId].elementIds.push(element.baseElementID)
                normalized.elements[element.baseElementID] = { ...element }
            }
        }
    }

    return normalized
}
