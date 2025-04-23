import { Box, TextField } from '@mui/material'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { DateTimeInputBox } from './DateTimeInputBox'
import classes from 'pages/TripDetails/AddElementDrawer/AddElementDrawer.module.scss'
import { FormSchema, TransportElementFormValues } from 'pages/TripDetails/AddElementDrawer/formSchema'
import { useMemo } from 'react'

export const TransportElementForm = () => {
    const { register, formState: { errors } } = useFormContext<FormSchema>()

    const testId = 'transport-element-form'

    const originPlaceErrorMessage = useMemo(() => {
      return (errors.elementInformation as FieldErrors<TransportElementFormValues>)?.originPlace?.message
    }, [errors.elementInformation])

    const destPlaceErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<TransportElementFormValues>)?.destinationPlace?.message
    }, [errors.elementInformation])

    const providerErrorMessage = useMemo(() => {
        return (errors.elementInformation as FieldErrors<TransportElementFormValues>)?.provider?.message
    }, [errors.elementInformation])

    return (
        <Box>
            <DrawerSectionTitle>
                Origin
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <div>
                    <TextField
                        className={classes.AddElementForm__FormField}
                        id={`${testId}-origin-place`}
                        label='Origin Place'
                        placeholder='London Heathrow'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-origin-place` } }}
                        {...register('elementInformation.originPlace')}
                    />
                {originPlaceErrorMessage &&
                    <InputErrorMessage
                        dataTestId={`${testId}-origin-place-error`}
                        error={originPlaceErrorMessage}
                    />
                }
                </div>
                <DateTimeInputBox
                    testId={`${testId}-start`}
                    dateFieldName='elementInformation.originDate'
                    timeFieldName='elementInformation.originTime'
                    dateLabel='Origin Date'
                    timeLabel='Origin Time'
                />
            </Box>
            <DrawerSectionTitle>
                Destination
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <div>
                    <TextField
                        className={classes.AddElementForm__FormField}
                        id={`${testId}-destination-place`}
                        label='Destination Place'
                        placeholder='Paris'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-dest-place` } }}
                        {...register('elementInformation.destinationPlace')}
                    />
                {destPlaceErrorMessage &&
                    <InputErrorMessage
                        dataTestId={`${testId}-dest-place-error`}
                        error={destPlaceErrorMessage}
                    />
                }
                </div>
                <DateTimeInputBox
                    testId={`${testId}-end`}
                    dateFieldName='elementInformation.destinationDate'
                    timeFieldName='elementInformation.destinationTime'
                    dateLabel='Destination Date'
                    timeLabel='Destination Time'
                />
            </Box>
            <DrawerSectionTitle>
                Additional Information
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <div>
                    <TextField
                        className={classes.AddElementForm__FormField}
                        id={`${testId}-provider`}
                        label='Provider'
                        placeholder='Ryanair'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-provider` } }}
                        {...register('elementInformation.provider')}
                    />
                    {providerErrorMessage &&
                        <InputErrorMessage
                            dataTestId={`${testId}-provider-error`}
                            error={providerErrorMessage}
                        />
                    }
                </div>
            </Box>
        </Box>
    )
}