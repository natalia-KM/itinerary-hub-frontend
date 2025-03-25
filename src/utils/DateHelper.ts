import dayjs, { Dayjs } from 'dayjs'

export const transformDayJsToString = (date?: Dayjs) => {
    return date ? date.format('YYYY-MM-DDTHH:mm:ss') : undefined
}

export const prettifyDate = (date?: Date) => {
    return dayjs(date).format('DD/MM/YYYY')
}