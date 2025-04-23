import { TripDetails } from './types'
import { AccommodationType, ElementType } from '../hooks/elements'
import { ElementDO, TripDO } from '../hooks/trips'
import { OptionDetails } from '../hooks/options'
import { SectionDetails } from '../hooks/sections'
import { isAccommElement } from './AccommodationHelper'

export interface NormalizedTripDetails {
    tripDetails: TripDetails
    sectionIds: string[]
}

export interface NormalizedSection {
    sectionDetails: SectionDetails
    optionIds: string[]
}

export interface ElementInfo {
    baseElementId: string
    elementType: ElementType
    accommodationType?: AccommodationType
}

export interface NormalizedOption {
    optionDetails: OptionDetails
    elementInfo: Record<string, ElementInfo>
}

export interface NormalizedTrip {
    trip: NormalizedTripDetails
    sections: Record<string, NormalizedSection>
    options: Record<string, NormalizedOption>
    elements: Record<string, ElementDO>
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
                elementInfo: {}
            }

            for (const element of option.baseElementDetails) {
                const type = isAccommElement(element) ? element.accommodationType : undefined
                normalized.options[option.optionDetails.optionId].elementInfo[element.elementID] = { baseElementId: element.baseElementID, elementType: element.elementType, accommodationType: type }
                normalized.elements[element.elementID] = { ...element }
            }
        }
    }

    return normalized
}
