import { Controller, FieldErrors, useFormContext } from 'react-hook-form'
import {
    ActivityElementFormValues,
    FormSchema
} from 'pages/TripDetails/AddElementDrawer/formSchema'
import { Box, TextField } from '@mui/material'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import classes from 'pages/TripDetails/AddElementDrawer/AddElementDrawer.module.scss'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { DateTimeInputBox } from './DateTimeInputBox'
import { useMemo } from 'react'
import { NumericFormat } from 'react-number-format'

export const ActivityElementForm = () => {
    const { register, control, formState: { errors } } = useFormContext<FormSchema>()

    const testId = 'activity-element-form'

    const activityNameErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<ActivityElementFormValues>)?.activityName?.message
    }, [errors.elementInformation])

    const locationErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<ActivityElementFormValues>)?.location?.message
    }, [errors.elementInformation])

    const hoursErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<ActivityElementFormValues>)?.hours?.message
    }, [errors.elementInformation])

    const minutesErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<ActivityElementFormValues>)?.minutes?.message
    }, [errors.elementInformation])

    return (
        <Box>
            <DrawerSectionTitle>
                Activity Details
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <div>
                    <TextField
                        className={classes.AddElementForm__FormField}
                        id={`${testId}-name`}
                        label='Activity Name'
                        placeholder='Escape Room'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-name` } }}
                        {...register('elementInformation.activityName')}
                    />
                    {activityNameErrorMessage &&
                        <InputErrorMessage
                            dataTestId={`${testId}-name-error`}
                            error={activityNameErrorMessage}
                        />
                    }
                </div>
                <div>
                    <TextField
                        className={classes.AddElementForm__FormField}
                        id={`${testId}-location`}
                        label='Location'
                        placeholder='Paris'
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
                Date & Time
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <DateTimeInputBox
                    testId={testId}
                    dateFieldName='elementInformation.startsAtDate'
                    timeFieldName='elementInformation.startsAtTime'
                    dateLabel='Start Date'
                    timeLabel='Start Time'
                />
            </Box>
            <DrawerSectionTitle>
                Duration
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <div className={classes.AddElementForm__DateTimeContainer}>
                <div>
                    <Controller
                        name='elementInformation.hours'
                        control={control}
                        render={({ field }) => {
                            return (
                                <NumericFormat
                                    value={field.value ?? null}
                                    onChange={(val) => {
                                        field.onChange(val)
                                    }}
                                    customInput={TextField}
                                    thousandSeparator
                                    valueIsNumericString
                                    size={'small'}
                                    variant="outlined"
                                    label="Hours"
                                />
                            )
                        }}
                    />
                    {hoursErrorMessage &&
                        <InputErrorMessage
                            dataTestId={`${testId}-location-error`}
                            error={hoursErrorMessage}
                        />
                    }
                </div>
                <div>
                    <Controller
                        name='elementInformation.minutes'
                        control={control}
                        render={({ field }) => {
                            return (
                                <NumericFormat
                                    value={field.value ?? null}
                                    onChange={(val) => {
                                        field.onChange(val)
                                    }}
                                    customInput={TextField}
                                    thousandSeparator
                                    valueIsNumericString
                                    size={'small'}
                                    variant="outlined"
                                    label="Minutes"
                                />
                            )
                        }}
                    />
                    {minutesErrorMessage &&
                        <InputErrorMessage
                            dataTestId={`${testId}-location-error`}
                            error={minutesErrorMessage}
                        />
                    }
                </div>
                </div>
            </Box>
        </Box>
    )
}