import { Box, Tooltip } from '@mui/material'
import classes from './ManageSectionModal.module.scss'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { EditableText } from 'components/EditableText'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { queryKeys } from 'config/queryKeys'
import { SectionDetails, useDeleteSection, useUpdateSection } from 'hooks/sections'
import { useTripId } from 'utils'

interface SectionListItemProps {
    isDragged: boolean
    sectionDetails: SectionDetails
}

export const SectionListItem = ({
    isDragged,
    sectionDetails
}: SectionListItemProps) => {
    const { tripId } = useTripId()

    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(sectionDetails.sectionName)
    const queryClient = useQueryClient()

    const testId = `manage-sections-${sectionDetails.sectionId}`

    const { mutateAsync: updateSection } = useUpdateSection()
    const { mutateAsync: deleteSection } = useDeleteSection()

    const handleSaveSectionName = async () => {
        setIsEditing(false)

        const newName = value?.trim()
        if (!newName || newName === sectionDetails.sectionName) {
            setValue(sectionDetails.sectionName)
            return
        }

        await updateSection({
            tripId,
            sectionId: sectionDetails.sectionId,
            request: { sectionName: newName }
        }).then(() => {
            setValue(newName)
            queryClient.setQueryData(['sectionDetails', sectionDetails.sectionId], (old: SectionDetails) => ({
                ...old,
                sectionName: newName
            }))
        }).catch(() => {
            setValue(sectionDetails.sectionId)
            toast.error('There was a problem updating the section name. Try again later.', {
                toastId: 'section-error-toast'
            })
        })
    }

    const handleDeleteSection = async () => {
        await deleteSection({ tripId, sectionId: sectionDetails.sectionId })
            .then(async () => {
                await queryClient.invalidateQueries({ queryKey: ['sectionIds', tripId] })
                await queryClient.invalidateQueries({ queryKey: [queryKeys.getSections, tripId] })
            })
            .catch(() => {
                toast.error('There was a problem deleting section. Try again later.', {
                    toastId: 'section-error-toast'
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
                key={`${sectionDetails.sectionId}-text`}
                testId={testId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSaveSectionName}
                size='small'
                withIcon={false}
            />

            <Box sx={{ flexGrow: 1 }} />
            {!isEditing && (
                <Tooltip title='Edit Section Name'>
                    <EditIcon className={classes.UpdateIcon} onClick={() => setIsEditing(true)} data-testid={`${testId}-edit-icon`}/>
                </Tooltip>
            )}
            {isEditing && (
                <Tooltip title='Confirm'>
                    <CheckIcon className={classes.UpdateIcon} onClick={handleSaveSectionName} data-testid={`${testId}-check-icon`}/>
                </Tooltip>
            )}
            <Tooltip title='Delete Section'>
                <DeleteIcon className={classes.DeleteIcon} onClick={handleDeleteSection} data-testid={`${testId}-delete-icon`}/>
            </Tooltip>
        </Box>
    )
}