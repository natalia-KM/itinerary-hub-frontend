import dayjs, { Dayjs } from 'dayjs'

export const transformDayJsToString = (date?: Dayjs) => {
    return date ? date.format('YYYY-MM-DDTHH:mm:ss') : undefined
}

export const prettifyDate = (date?: Date) => {
    return dayjs(date).format('DD/MM/YYYY')
}

export const getDatesText = (startDate?: Date, endDate?: Date) => {
    if (startDate && endDate) {
        return `${prettifyDate(startDate)} - ${prettifyDate(endDate)}`
    }

    if (startDate) {
        return prettifyDate(startDate)
    }

    return undefined
}