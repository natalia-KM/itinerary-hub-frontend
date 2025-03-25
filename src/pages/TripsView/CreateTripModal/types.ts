import { Dayjs } from 'dayjs'

export type CreateTripFormFields = {
    tripName: string
    startDate?: Dayjs
    endDate?: Dayjs
    imageRef?: string
}