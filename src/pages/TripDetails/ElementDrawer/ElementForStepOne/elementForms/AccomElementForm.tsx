import { FieldErrors, useFormContext } from 'react-hook-form'
import {
    AccommodationElementFormValues,
    FormSchema
} from 'pages/TripDetails/ElementDrawer/formSchema'
import { Box, TextField } from '@mui/material'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import classes from 'pages/TripDetails/ElementDrawer/ElementDrawer.module.scss'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { useMemo } from 'react'
import { DateTimeInputBox } from './DateTimeInputBox'

export const AccomElementForm = () => {
    const { register, formState: { errors } } = useFormContext<FormSchema>()

    const testId = 'accomm-element-form'

    const placeErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<AccommodationElementFormValues>)?.place?.message
    }, [errors.elementInformation])

    const locationErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<AccommodationElementFormValues>)?.location?.message
    }, [errors.elementInformation])

    return (
        <Box>
            <DrawerSectionTitle>
                Accommodation Details
            </DrawerSectionTitle>
            <Box className={classes.ElementForm__Section}>
                <div>
                    <TextField
                        className={classes.ElementForm__FormField}
                        id={`${testId}-place`}
                        label='Place Name'
                        placeholder='Hilton Paris Opera'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-place` } }}
                        {...register('elementInformation.place')}
                    />
                    {placeErrorMessage &&
                        <InputErrorMessage
                            dataTestId={`${testId}-place-error`}
                            error={placeErrorMessage}
                        />
                    }
                </div>
                <div>
                    <TextField
                        className={classes.ElementForm__FormField}
                        id={`${testId}-location`}
                        label='Location'
                        placeholder='108 Rue Saint-Lazare, 8th arr.'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-location` } }}
                        {...register('elementInformation.location')}
                    />
                    {locationErrorMessage &&
                        <InputErrorMessage
                            dataTestId={`${testId}-location-error`}
                            error={locationErrorMessage}
                        />
                    }
                </div>
            </Box>
            <DrawerSectionTitle>
                Check In
            </DrawerSectionTitle>
            <Box className={classes.ElementForm__Section}>
                <DateTimeInputBox
                    testId={`${testId}-checkin`}
                    dateFieldName='elementInformation.checkInDate'
                    timeFieldName='elementInformation.checkInTime'
                    dateLabel='Check In Date'
                    timeLabel='Check In Time'
                />
            </Box>

            <DrawerSectionTitle>
                Check Out
            </DrawerSectionTitle>
            <Box className={classes.ElementForm__Section}>
                <DateTimeInputBox
                    testId={`${testId}-checkout`}
                    dateFieldName='elementInformation.checkOutDate'
                    timeFieldName='elementInformation.checkOutTime'
                    dateLabel='Check Out Date'
                    timeLabel='Check Out Time'
                />
            </Box>
        </Box>
    )
}