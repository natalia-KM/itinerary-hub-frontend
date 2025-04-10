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

export interface BaseElementRequest {
    elementType: ElementType
    link?: string
    price?: number
    notes?: string
    status?: ElementStatus
}

export interface BaseElementDetails {
    baseElementID: string;
    optionID: string;
    lastUpdatedAt: string;
    elementType: ElementType;
    link?: string;
    price?: number;
    notes?: string;
    status?: ElementStatus;
    order: number;
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
}