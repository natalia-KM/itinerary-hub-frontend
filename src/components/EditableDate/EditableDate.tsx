import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import classes from './EditableDate.module.scss'
import classnames from 'classnames'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import OutsideAlerter from 'utils/OutsideAlerter'

interface EditableDateProps {
    initialValue: Dayjs | null
    onSave: (value: Dayjs | null) => void
    label: string
    displayText?: string
    testId?: string
}

export const EditableDate = ({
    initialValue,
    onSave,
    label,
    displayText,
    testId
}: EditableDateProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const handleSave = (newDate: Dayjs | null) => {
        setIsEditing(false)
        onSave(newDate)
    }

    const onClickOutside = () => {
        if(isCalendarOpen) return
        setIsEditing(false)
    }

    return (
        <>
            {!isEditing && (
                <Box>
                    <Typography
                        data-testid={`${testId}-display-text`}
                        className={
                            classnames(
                                classes.DisplayDate
                            )}
                        onClick={() => setIsEditing(true)}
                    >
                        {initialValue?.format('DD/MM/YYYY') ?? displayText}
                    </Typography>
                    <Typography
                        data-testid={`${testId}-label`}
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {label}
                    </Typography>
                </Box>
            )}
            {isEditing && (
                <OutsideAlerter onClickOutside={onClickOutside}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DatePicker
                            className={classes.InputComponent}
                            label={label}
                            value={initialValue}
                            onChange={(e) => handleSave(e)}
                            onClose={() => setIsEditing(false)}
                            onOpen={() => setIsCalendarOpen(true)}
                            open={isCalendarOpen}
                            slotProps={{ textField: { size: 'small', id: `${testId}-input`, className: classes.DisplayDate__InputSize } }}
                            autoFocus
                        />
                    </LocalizationProvider>
                </OutsideAlerter>
            )}
        </>
    )
}