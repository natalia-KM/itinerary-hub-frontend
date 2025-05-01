import { Box, TableCell, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import classnames from 'classnames'
import classes from './AccountInfoModal.module.scss'
import OutsideAlerter from 'utils/OutsideAlerter'

interface EditableTableCellProps {
    defaultValue?: string
    onSave: (val?: string) => void
    testId: string
}

export const EditableTableCell = ({
    defaultValue,
    onSave,
    testId
}: EditableTableCellProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const handleSave = () => {
        if (!isEditing) return
        onConfirm()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onConfirm()
        }
    }

    const onConfirm = () => {
        setIsEditing(false)
        try {
            onSave(value)
        } catch {
            setValue(defaultValue)
        }
    }

    return (
        <TableCell className={classes.EditableCell}>
            {!isEditing && (
                <Box
                    className={classnames(classes.DisplayText)}
                    onClick={() => {
                        setIsEditing(true)
                    }}
                >
                    <Typography
                        data-testid={`${testId}-text`}
                        className={classes.DisplayText__Text}
                    >
                        {value}
                    </Typography>
                </Box>
            )}
            {isEditing && (
                <OutsideAlerter onClickOutside={onConfirm}>
                    <TextField
                        className={classes.Editable}
                        id={`${testId}-input`}
                        data-testid={`${testId}-input`}
                        variant="outlined"
                        value={value}
                        onChange={(e) => {
                            const val = e.target.value
                            if(!val) return
                            setValue(val)
                        }}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        size="small"
                        slotProps={{
                            htmlInput: { 'data-testid': `${testId}-input` }
                        }}
                        autoFocus
                        fullWidth
                    />
                </OutsideAlerter>
            )}
        </TableCell>
    )
}