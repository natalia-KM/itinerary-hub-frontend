import {
    AccommodationElementFormValues,
    ActivityElementFormValues,
    FormSchema,
    TransportElementFormValues
} from 'pages/TripDetails/ElementDrawer/formSchema'
import {
    BaseElementRequest,
    UpdateAccommElementValues,
    UpdateActivityValues,
    UpdateTransportElementValues
} from 'hooks/elements'
import { mergeDates, transformDayJsToString } from 'utils'

export const getBaseElementRequest = (formValues: FormSchema): BaseElementRequest => {
    return {
        elementType: formValues.elementType,
        elementCategory: formValues.elementCategory,
        link: formValues.link,
        price: formValues.price ? parseFloat(formValues.price) : undefined,
        notes: formValues.notes,
        status: formValues.status,
        passengerIds: formValues.passengerIds
    }
}

export const getUpdateTransportRequestFromForm = (formValues: FormSchema): UpdateTransportElementValues | null=> {
    const info = formValues.elementInformation as TransportElementFormValues

    const originDateTimeJs = mergeDates({ date: info.originDate, time: info.originTime })
    const destDateTimeJs = mergeDates({ date: info.destinationDate, time: info.destinationTime })

    const originDateTime = transformDayJsToString(originDateTimeJs)
    const destinationDateTime = transformDayJsToString(destDateTimeJs)

    if(!originDateTime || !destinationDateTime) return null

    return {
        baseElementRequest: getBaseElementRequest(formValues),
        originPlace: info.originPlace,
        destinationPlace: info.destinationPlace,
        originDateTime,
        destinationDateTime,
        provider: info.provider
    }
}

export const getUpdateActivityRequestFromForm  = (formValues: FormSchema): UpdateActivityValues | null=> {
    const info = formValues.elementInformation as ActivityElementFormValues

    const startsAtDateTimeJs = mergeDates({ date: info.startsAtDate, time: info.startsAtTime })
    const startsAtDateTime = transformDayJsToString(startsAtDateTimeJs)

    const duration = (parseInt(info?.hours ?? '0') * 60) + parseInt(info?.minutes ?? '0')

    if(!startsAtDateTime) return null

    return {
        baseElementRequest: getBaseElementRequest(formValues),
        activityName: info.activityName,
        location: info.location,
        startsAt: startsAtDateTime,
        duration: duration !== 0 ? duration : undefined
    }
}

export const getUpdateAccommRequestFromForm  = (formValues: FormSchema): UpdateAccommElementValues | null=> {
    const info = formValues.elementInformation as AccommodationElementFormValues

    const checkInDateTimeJs = mergeDates({ date: info.checkInDate, time: info.checkInTime })
    const checkOutDateTimeJs = mergeDates({ date: info.checkOutDate, time: info.checkOutTime })

    const checkInDateTime = transformDayJsToString(checkInDateTimeJs)
    const checkOutDateTime = transformDayJsToString(checkOutDateTimeJs)

    if(!checkInDateTime || !checkOutDateTime) return null


    return {
        baseElementRequest: getBaseElementRequest(formValues),
        place: info.place,
        location: info.location,
        checkIn: {
            dateTime: checkInDateTime
        },
        checkOut: {
            dateTime: checkOutDateTime
        }
    }
}