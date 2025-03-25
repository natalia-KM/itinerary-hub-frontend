import { Controller, useForm } from 'react-hook-form'
import { TripFormFields } from 'pages/TripsView/shared'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'pages/TripsView/CreateTripModal/createTripFormSchema'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import { Box, TextField } from '@mui/material'
import { InputErrorMessage } from 'components/InputErrorMessage/InputErrorMessage'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ImagePicker } from 'pages/TripsView/CreateTripModal/ImagePicker/ImagePicker'
import { DrawerActionButtons } from 'components/DrawerActionButtons/DrawerActionButtons'
import { TripDetails } from 'utils/types'

import classes from './TripFormBase.module.scss'
import dayjs from 'dayjs'

interface TripFormBaseProps {
    onSubmit: (data: TripFormFields) => void
    onClose: () => void
    testIdKey: string
    isSubmitLoading: boolean
    defaultValues?: TripDetails
}

export const TripFormBase = ({
    onSubmit,
    onClose,
    testIdKey,
    isSubmitLoading,
    defaultValues
}: TripFormBaseProps) => {
    const initialStartDate = defaultValues?.startDate ? dayjs(defaultValues.startDate) : undefined
    const initialEndDate = defaultValues?.endDate ? dayjs(defaultValues.endDate) : undefined


    const { register, control, handleSubmit, formState: { errors } } = useForm<TripFormFields>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues ? {
            tripName: defaultValues.tripName,
            startDate: initialStartDate,
            endDate: initialEndDate,
            imageRef: defaultValues.imageRef
        } : undefined
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.TripForm}>
            <DrawerSectionTitle>
                Fill in trip details
            </DrawerSectionTitle>
            <Box className={classes.TripForm__Section}>
                <div className={classes.TripForm__FormField}>
                    <TextField
                        className={classes.TripForm__FormField}
                        id={`${testIdKey}-trip-name`}
                        data-testid={`${testIdKey}-trip-name`}
                        label="Trip Name"
                        placeholder="Paris Trip"
                        defaultValue={defaultValues?.tripName ?? ''}
                        variant="outlined"
                        size="small"
                        {...register('tripName')}
                    />
                    {errors.tripName &&
                        <InputErrorMessage
                            dataTestId={`${testIdKey}-trip-name-error`}
                            error={errors.tripName.message}
                        />
                    }
                </div>

                <div className={classes.TripForm__DatePicker}>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => {
                            return (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Start Date"
                                        defaultValue={initialStartDate}
                                        value={field.value ?? null}
                                        inputRef={field.ref}
                                        onChange={(date) => {
                                            field.onChange(date)
                                        }}
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            )
                        }}
                    />
                </div>

                <div className={classes.TripForm__DatePicker}>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => {
                            return (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="End Date"
                                        defaultValue={initialEndDate}
                                        value={field.value ?? null}
                                        inputRef={field.ref}
                                        onChange={(date) => {
                                            field.onChange(date)
                                        }}
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            )
                        }}
                    />
                    {errors.endDate &&
                        <InputErrorMessage
                            dataTestId={`${testIdKey}-end-date-error`}
                            error={errors.endDate.message}
                        />
                    }
                </div>
            </Box>

            <Box className={classes.TripForm__Section}>
                <Controller
                    name="imageRef"
                    control={control}
                    defaultValue={defaultValues?.imageRef ?? 'default'}
                    render={({ field }) => (
                        <ImagePicker
                            currentValue={field.value}
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
            </Box>

            <Box sx={{ flexGrow: 1 }}/>

            <Box className={classes.TripForm__Section}>
                <DrawerActionButtons
                    confirmLoading={isSubmitLoading}
                    confirmDisabled={Boolean(errors.tripName || errors.endDate)}
                    onCancel={onClose}
                />
            </Box>
        </form>
    )
}