import { AccommodationType, ElementType } from '../types'

export interface UpdateElementOrderValues {
    elementType: ElementType
    order: number
    accommodationType?: AccommodationType
}

export interface UpdateElementOrderRequest {
    request: UpdateElementOrderValues
    baseElementId: number
}

