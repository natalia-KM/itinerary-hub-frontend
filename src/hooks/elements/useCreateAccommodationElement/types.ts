import { BaseElementRequest } from '../types'

export interface CreateEventRequest {
    dateTime: string
    order: number
}

export interface CreateAccommElementValues {
    baseElementRequest: BaseElementRequest
    place: string
    location?: string
    checkIn: CreateEventRequest
    checkOut: CreateEventRequest
}

export interface CreateAccommElementRequest {
    request: CreateAccommElementValues
    sectionId: string
    optionId: string
}