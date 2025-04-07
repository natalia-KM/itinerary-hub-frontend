import { BaseElementRequest } from '../types'

export interface CreateTransportElementValues {
    baseElementRequest: BaseElementRequest
    originPlace: string
    destinationPlace: string
    originDateTime: string
    destinationDateTime: string
    provider?: string
    order: number
}

export interface CreateTransportElementRequest {
    request: CreateTransportElementValues
    sectionId: string
    optionId: string
}