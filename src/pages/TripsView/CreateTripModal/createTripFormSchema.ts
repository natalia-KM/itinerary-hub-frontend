import * as yup from 'yup'
import { mixed } from 'yup'
import dayjs from 'dayjs'

export const schema = yup.object({
    tripName: yup
        .string()
        .required()
        .min(3)
        .max(50)
        .label('Trip name')
        .matches(/^[A-Za-z]+([ '][A-Za-z]+)*$/, 'Only letters, spaces, and apostrophes are allowed.'),
    startDate: mixed<dayjs.Dayjs>(),
    endDate: mixed<dayjs.Dayjs>()
        .test({
            name: 'isBefore',
            message: 'End date must be after start date',
            test: (value, context) => {
            const startDate = context.parent.startDate

            if(!startDate || !value) return true

            return !startDate.isAfter(value)
        }
        })
        .test({
            name: 'noStartDate',
            message: 'To add an end date, add a start date first',
            test: (value, context) => {
                return !(value && !context.parent.startDate)

            }
        }),
    imageRef: yup.string()
})
