import { Dayjs } from 'dayjs'
import { ElementStatus, ElementType } from 'hooks/elements'

export type TransportElementFormValues = {
    type: 'TRANSPORT'
    originPlace: string
    originDate: Dayjs
    originTime: Dayjs
    destinationPlace: string
    destinationDate: Dayjs
    destinationTime: Dayjs
    provider?: string
}

export type ActivityElementFormValues = {
    type: 'ACTIVITY'
    activityName: string
    location: string
    startsAtDate?: Dayjs
    startsAtTime?: Dayjs
    hours?: string
    minutes?: string
}

export type AccommodationElementFormValues = {
    type: 'ACCOMMODATION'
    place: string
    location?: string
    checkInDate: Dayjs
    checkInTime: Dayjs
    checkOutDate: Dayjs
    checkOutTime: Dayjs
}
export type ElementTypesUnion = TransportElementFormValues | ActivityElementFormValues | AccommodationElementFormValues

export type FormSchema = {
    elementType: ElementType
    elementCategory: string
    elementInformation: ElementTypesUnion
    price?: string
    link?: string
    notes?: string
    status?: ElementStatus
    passengerIds: string[]
}