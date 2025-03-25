import { Dayjs } from 'dayjs'

export type TripFormFields = {
    tripName: string
    startDate?: Dayjs
    endDate?: Dayjs
    imageRef?: string
}