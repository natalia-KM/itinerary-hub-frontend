export enum ElementType {
    ACTIVITY = 'ACTIVITY',
    TRANSPORT = 'TRANSPORT',
    ACCOMMODATION = 'ACCOMMODATION'
}

export enum ElementStatus {
    PENDING = 'PENDING',
    BOOKED = 'BOOKED',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED'
}

export enum AccommodationType {
    CHECK_IN = 'CHECK_IN',
    CHECK_OUT = 'CHECK_OUT'
}

export const accommodationTypeLabel = (type: AccommodationType) => {
    return type === AccommodationType.CHECK_IN ? 'Check-In' : 'Check-Out'
}

export interface PassengerDetails {
    passengerId: string
    firstName: string
    lastName: string
    avatar: string
}

export interface BaseElementRequest {
    elementType: ElementType
    elementCategory: string
    link?: string
    price?: number
    notes?: string
    status?: ElementStatus
    passengerIds?: string[]
}

export interface BaseElementDetails {
    baseElementID: string
    elementID: string
    optionID: string
    lastUpdatedAt: string
    elementType: ElementType
    elementCategory: string
    link?: string
    price?: number
    notes?: string
    status?: ElementStatus
    order: number
    passengerDetailsList: PassengerDetails[]
}

export interface TransportElementDetails extends BaseElementDetails {
    originPlace: string
    destinationPlace: string
    originDateTime: string
    destinationDateTime: string
    provider?: string
}

export interface ActivityElementDetails extends BaseElementDetails {
    activityName: string
    location: string
    startsAt?: string
    duration?: number
}

export interface AccommodationElementDetails extends BaseElementDetails {
    place: string
    location?: string
    accommodationType: AccommodationType
    dateTime: string
}

export interface GetElementRequest {
    sectionId: string
    optionId: string
    baseElementId: string
}