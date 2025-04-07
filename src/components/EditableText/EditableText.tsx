import { Box, TextField, Typography } from '@mui/material'
import classes from './EditableText.module.scss'
import classnames from 'classnames'
import EditIcon from '@mui/icons-material/Edit'
import { ControlledEditableTextProps } from './types'

export const EditableText = ({
    value,
    setValue,
    isEditing,
    setIsEditing,
    onSave,
    size = 'large',
    withIcon = true,
    testId,
    ...typographyProps
}: ControlledEditableTextProps) => {

    const handleSave = () => {
        if(!isEditing) return
        onSave()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsEditing(false)
            onSave()
        }
    }

    return (
        <>
            {!isEditing && (
                <Box className={classnames(classes.DisplayText)} {...typographyProps} onClick={() => {
                    setIsEditing(true)
                }}>
                    <Typography
                        data-testid={`${testId}-text`}
                        className={
                            classnames(
                                classes.DisplayText__Text,
                                classes[`DisplayText_${size}`]
                            )}
                    >
                        {value}
                    </Typography>
                    {withIcon && (
                        <EditIcon
                            className={
                                classnames(
                                    classes.Icon,
                                    classes[`Icon_${size}`]
                                )}
                        />
                    )}
                </Box>
            )}
            {isEditing && (
                <TextField
                    data-testid={`${testId}-input`}
                    className={classes[`InputComponent_${size}`]}
                    id="outlined-basic"
                    variant="outlined"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    size="small"
                    autoFocus
                />
            )}
        </>
    )
}