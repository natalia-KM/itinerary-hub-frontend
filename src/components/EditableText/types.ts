import { TypographyProps } from '@mui/material'

export interface EditableTextProps extends TypographyProps {
    /**
     * Size of the text and the text field
     */
    size?: 'xs' | 'small' | 'medium' | 'large'

    /**
     * Optional function to enable/disable editing mode. Must be passed with value.
     *  * Useful when the Edit action button is placed far from the text field.
     * @param value
     */
    onEditChange?: boolean

    /**
     * Optional value to set editing mode.
     *  * Useful when the Edit action button is placed far from the text field.
     */
    textValue?: string

    /**
     * When true the Edit icon will be shown next to the text.
     * Defaults to true
     */
    withIcon?: boolean
}

export interface ControlledEditableTextProps extends EditableTextProps {
    value?: string
    setValue: (value: string) => void
    isEditing: boolean
    setIsEditing: (value: boolean) => void
    onSave: () => void
    testId?: string
}