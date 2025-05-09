import dayjs, { Dayjs } from 'dayjs'

export const transformDayJsToString = (date?: Dayjs | null) => {
    return date ? date.format('YYYY-MM-DDTHH:mm:ss') : undefined
}

export const prettifyDate = (date?: Date) => {
    return dayjs(date).format('DD/MM/YYYY')
}

export const prettifyDateWithTime = (date?: Date) => {
    const dateLabel =  dayjs(date).format('DD/MM/YYYY')
    const timeLabel = dayjs(date).format('HH:mm')
    return `${dateLabel} ${timeLabel}`
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

export const mergeDates = ({
    date,
    time
}: { date?: Dayjs | null, time?: Dayjs | null }) => {
    if (!date || !time) {
        return null
    }
    return date
        .hour(time.hour())
        .minute(time.minute())
}