import { ElementDO } from 'hooks/trips'
import {
    AccommodationElementFormValues,
    ActivityElementFormValues,
    ElementTypesUnion,
    FormSchema,
    TransportElementFormValues
} from '../ElementDrawer'
import {
    AccommodationElementDetails,
    AccommodationType,
    ActivityElementDetails,
    ElementType,
    TransportElementDetails
} from 'hooks/elements'
import dayjs from 'dayjs'

export const currencyMap: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: '$',
    CAD: '$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    NZD: '$',
}

export const getCurrencySymbol = (code: string): string => {
    return currencyMap[code]
}

export const prettifyPrice = (currency?: string | null, price?: number): string | undefined => {
    if(!currency || !price) return

    return `${getCurrencySymbol(currency)} ${price}`
}

export const mapElementDetailsToFormSchema = (elementDOlist?: ElementDO[]): FormSchema | undefined => {
    if (!elementDOlist || !elementDOlist.length) {
        console.error('undefined element details')
        return
    }

    const elementDO = elementDOlist[0]
    const elementType = elementDO.elementType

    if (elementType === ElementType.ACCOMMODATION && elementDOlist.length !== 2) return

    let elementInformation: ElementTypesUnion
    switch (elementType) {
        case ElementType.TRANSPORT: {
            const transportEl = elementDO as TransportElementDetails
            elementInformation = mapTransportDetails(transportEl)
            break
        }
        case ElementType.ACTIVITY: {
            const activityEl = elementDO as ActivityElementDetails
            elementInformation = mapActivityDetails(activityEl)
            break
        }
        case ElementType.ACCOMMODATION: {
            elementInformation = mapAccommDetails(elementDOlist)
        }
    }
    
    return {
        elementCategory: elementDO.elementCategory,
        elementInformation: elementInformation,
        elementType: elementDO.elementType,
        link: elementDO.link,
        notes: elementDO.notes,
        passengerIds: elementDO.passengerDetailsList.map((p) => p.passengerId),
        price: elementDO.price?.toString(),
        status: elementDO.status

    }
}

const mapTransportDetails = (el: TransportElementDetails): TransportElementFormValues => {
    return {
        type: 'TRANSPORT',
        originPlace: el.originPlace,
        originDate: dayjs(el.originDateTime),
        originTime: dayjs(el.originDateTime),
        destinationPlace: el.destinationPlace,
        destinationDate: dayjs(el.destinationDateTime),
        destinationTime: dayjs(el.destinationDateTime),
        provider: el.provider
    }
}
const mapActivityDetails = (activityEl: ActivityElementDetails): ActivityElementFormValues => {
    return {
        type: 'ACTIVITY',
        activityName: activityEl.activityName,
        location: activityEl.location,
        startsAtDate: dayjs(activityEl.startsAt),
        startsAtTime: dayjs(activityEl.startsAt),
        hours: activityEl.duration ? Math.floor(activityEl.duration / 60).toString() : '',
        minutes: activityEl.duration ? (activityEl.duration % 60).toString() : ''
    }
}

const mapAccommDetails = (accommElements: ElementDO[]): AccommodationElementFormValues => {
    const firstElement = accommElements[0] as AccommodationElementDetails
    const secondElement = accommElements[1] as AccommodationElementDetails

    const isFirstElementCheckIn = firstElement.accommodationType === AccommodationType.CHECK_IN
    const checkIn = isFirstElementCheckIn ? dayjs(firstElement.dateTime) : dayjs(secondElement.dateTime)
    const checkOut = isFirstElementCheckIn ? dayjs(secondElement.dateTime) : dayjs(firstElement.dateTime)

    return {
        type: 'ACCOMMODATION',
        place: firstElement.place,
        location: firstElement.location,
        checkInDate: checkIn,
        checkInTime: checkIn,
        checkOutDate: checkOut,
        checkOutTime: checkOut
    }
}