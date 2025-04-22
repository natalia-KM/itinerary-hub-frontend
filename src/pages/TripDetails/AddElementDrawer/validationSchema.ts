import { z } from 'zod'
import { ElementStatus, ElementType } from 'hooks/elements'
import dayjs, { Dayjs } from 'dayjs'
import { mergeDates } from 'utils'

const transportSchema = z.object({
    type: z.literal('TRANSPORT'),
    originPlace: z
        .string()
        .min(1, 'Required')
        .max(100)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters'),
    originDate: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Date is required'),
    originTime: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Time is required'),
    destinationPlace: z
        .string()
        .min(1, 'Required')
        .max(100)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters'),
    destinationDate: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Date is required'),
    destinationTime: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Time is required'),
    provider: z
        .string()
        .max(100)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters')
        .optional(),
})

const activitySchema = z.object({
    type: z.literal('ACTIVITY'),
    activityName: z
        .string()
        .min(1, 'Required')
        .max(150)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters'),
    location: z
        .string()
        .min(1, 'Required')
        .max(150)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters'),
    startsAtDate: z.any().optional(),
    startsAtTime: z.any().optional(),
    hours: z.string().optional(),
    minutes: z.string().optional(),
})

const accommodationSchema = z.object({
    type: z.literal('ACCOMMODATION'),
    place: z
        .string()
        .min(1, 'Required')
        .max(150)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters'),
    location: z
        .string()
        .max(100)
        .regex(/^[\p{L}\d\s\-'.]+$/u, 'Invalid characters')
        .optional(),
    checkInDate: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Date is required'),
    checkInTime: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Time is required'),
    checkOutDate: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Date is required'),
    checkOutTime: z
        .custom<Dayjs>((val) => val instanceof dayjs, 'Time is required')
})

const elementInformationSchema = z.discriminatedUnion('type', [
    transportSchema,
    activitySchema,
    accommodationSchema
]).superRefine((val, ctx) => {
    if(val.type === 'ACCOMMODATION') {
        const { checkInDate, checkInTime, checkOutDate, checkOutTime } = val

        const checkInDateTime = mergeDates({ date: checkInDate, time: checkInTime })
        const checkOutDateTime = mergeDates({ date: checkOutDate, time: checkOutTime })

        if(checkOutDateTime?.isBefore(checkInDateTime)) {
            ctx.addIssue({
                path: ['checkOutDate'],
                code: z.ZodIssueCode.custom,
                message: 'Check out date must be after check in date',
            })
        }
    } else if(val.type === 'ACTIVITY') {
        const { startsAtDate, startsAtTime } = val
        const mergedDateTime = mergeDates({ date: startsAtDate, time: startsAtTime })

        if(!mergedDateTime?.isValid()) {
            ctx.addIssue({
                path: ['startsAtDate'],
                code: z.ZodIssueCode.custom,
                message: 'Invalid date',
            })
        }
    }
})


export const formSchema = z.object({
    elementType: z.nativeEnum(ElementType),
    elementCategory: z.string(),
    elementInformation: elementInformationSchema,
    price: z.string().optional(),
    link: z.string()
        .regex(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/, 'Invalid URL')
        .optional()
        .or(z.literal('')),
    notes: z.string().max(245).optional(),
    status: z.nativeEnum(ElementStatus).optional(),
    passengerIds: z.array(z.string().uuid())
})

export const stepOneFields = [
    'elementType',
    'elementCategory',
    'elementInformation'
] as const