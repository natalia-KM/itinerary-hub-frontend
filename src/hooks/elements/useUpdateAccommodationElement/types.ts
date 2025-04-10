import { AccommodationElementDetails, BaseElementRequest } from '../types'

export interface UpdateEventRequest {
    dateTime?: string
    order?: number
}

export interface UpdateAccommElementValues {
    baseElementRequest: BaseElementRequest
    place?: string
    location?: string
    checkIn?: UpdateEventRequest
    checkOut?: UpdateEventRequest
}

export interface UpdateAccommElementRequest {
    request: UpdateAccommElementValues
    sectionId: string
    optionId: string
    baseElementId: string
}

export type AccommElementsPair = AccommodationElementDetails[]
