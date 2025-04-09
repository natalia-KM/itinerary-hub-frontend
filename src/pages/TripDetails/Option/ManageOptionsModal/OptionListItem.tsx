import { Box, Tooltip } from '@mui/material'
import classes from './ManageOptionsModal.module.scss'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { EditableText } from 'components/EditableText'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { OptionDetails, useDeleteOption, useUpdateOption } from 'hooks/options'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { queryKeys } from 'config/queryKeys'

interface OptionListItemProps {
    isDragged: boolean
    sectionId: string
    optionDetails: OptionDetails
}

export const OptionListItem = ({
    isDragged,
    sectionId,
    optionDetails
}: OptionListItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(optionDetails.optionName)
    const queryClient = useQueryClient()

    const testId = `manage-options-${optionDetails.optionId}`

    const { mutateAsync: updateOption } = useUpdateOption()
    const { mutateAsync: deleteOption } = useDeleteOption()

    const handleSaveOptionName = async () => {
        setIsEditing(false)

        const newName = value?.trim()
        if (!newName || newName === optionDetails?.optionName) {
            setValue(optionDetails?.optionName)
            return
        }

        await updateOption({
            sectionId,
            optionId: optionDetails.optionId,
            request: { optionName: newName }
        }).then(() => {
            setValue(newName)
            queryClient.setQueryData(['optionDetails', optionDetails.optionId], (old: OptionDetails) => ({
                ...old,
                optionName: newName
            }))
        }).catch(() => {
            setValue(optionDetails?.optionName)
            toast.error('There was a problem updating the option name. Try again later.', {
                toastId: 'option-error-toast'
            })
        })
    }

    const handleDeleteOption = async () => {
        await deleteOption({ sectionId, optionId: optionDetails.optionId })
            .then(async () => {
                await queryClient.invalidateQueries({ queryKey: [queryKeys.getOptions, sectionId] })
            })
            .catch(() => {
                toast.error('There was a problem deleting an option. Try again later.', {
                    toastId: 'option-error-toast'
                })
            })
    }

    return (
        <Box className={classes.ItemContainer} data-testid={`${testId}-item`}>
            <button
                data-movable-handle
                className={classes.Button}
                style={{
                    cursor: isDragged ? 'grabbing' : 'grab'
                }}
                tabIndex={-1}
            >
                <DragIndicatorIcon data-testid={`${testId}-drag-icon`} />
            </button>
            <EditableText
                value={value}
                setValue={setValue}
                key={`${optionDetails.optionId}-text`}
                testId={testId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSaveOptionName}
                size='small'
                withIcon={false}
            />

            <Box sx={{ flexGrow: 1 }} />
            {!isEditing && (
                <Tooltip title='Edit Option Name'>
                    <EditIcon className={classes.UpdateIcon} onClick={() => setIsEditing(true)} data-testid={`${testId}-edit-icon`}/>
                </Tooltip>
            )}
            {isEditing && (
                <Tooltip title='Confirm'>
                    <CheckIcon className={classes.UpdateIcon} onClick={handleSaveOptionName} data-testid={`${testId}-check-icon`}/>
                </Tooltip>
            )}
            <Tooltip title='Delete Option'>
                <DeleteIcon className={classes.DeleteIcon} onClick={handleDeleteOption} data-testid={`${testId}-delete-icon`}/>
            </Tooltip>
        </Box>
    )
}