import { BaseElementRequest } from '../types'

export interface UpdateTransportElementValues {
    baseElementRequest: BaseElementRequest
    originPlace?: string
    destinationPlace?: string
    originDateTime?: string
    destinationDateTime?: string
    provider?: string
    order?: number
}

export interface UpdateTransportElementRequest {
    request: UpdateTransportElementValues
    sectionId: string
    optionId: string
    baseElementId: string
}