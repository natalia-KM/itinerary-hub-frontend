import { InputErrorMessage } from 'components/InputErrorMessage'
import { Controller, FieldErrors, useFormContext } from 'react-hook-form'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import classes from 'pages/TripDetails/ElementDrawer/ElementDrawer.module.scss'

interface PlaceDateTimeInputBoxProps {
    testId: string
    dateFieldName: string
    timeFieldName: string
    dateLabel: string
    timeLabel: string
}
const getNestedError = (errors: FieldErrors, path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return path.split('.').reduce((acc, part) => acc?.[part], errors as any)
}

export const DateTimeInputBox = ({
    testId,
    dateFieldName,
    timeFieldName,
    dateLabel,
    timeLabel
}: PlaceDateTimeInputBoxProps) => {
    const { control, formState: { errors } } = useFormContext()

    const dateError = getNestedError(errors, dateFieldName)?.message
    const timeError = getNestedError(errors, timeFieldName)?.message

    return (
        <div className={classes.ElementForm__DateTimeContainer}>
            <div className={classes.ElementForm__DatePicker}>
                <Controller
                    name={dateFieldName}
                    control={control}
                    render={({ field }) => {
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <DatePicker
                                    label={dateLabel}
                                    value={field.value ?? null}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date)
                                    }}
                                    slotProps={{ textField: { size: 'small', id: `${testId}-date` } }}
                                />
                            </LocalizationProvider>
                        )
                    }}
                />
                {dateError &&
                    <InputErrorMessage
                        dataTestId={`${testId}-date-error`}
                        error={dateError}
                    />
                }
            </div>

            <div className={classes.ElementForm__DatePicker}>
                <Controller
                    name={timeFieldName}
                    control={control}
                    render={({ field }) => {
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <TimePicker
                                    label={timeLabel}
                                    value={field.value ?? null}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date)
                                    }}
                                    slotProps={{ textField: { size: 'small', id: `${testId}-time` } }}
                                />
                            </LocalizationProvider>
                        )
                    }}
                />
                {timeError &&
                    <InputErrorMessage
                        dataTestId={`${testId}-time-error`}
                        error={timeError}
                    />
                }
            </div>
        </div>
    )
}