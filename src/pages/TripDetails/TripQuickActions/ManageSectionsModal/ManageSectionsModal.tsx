import { CustomModal } from 'components/CustomModal'
import { arrayMove, List } from 'react-movable'
import React, { useEffect, useState } from 'react'
import classes from './ManageSectionModal.module.scss'
import { Box, Button, Skeleton, TextField, Tooltip, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import classnames from 'classnames'
import CheckIcon from '@mui/icons-material/Check'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useTripId } from 'utils'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { toast } from 'react-toastify'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { ModalActionButtonsProps } from 'components/ModalActionButtons'
import { useCreateSection, useGetSections, useUpdateSectionOrder } from 'hooks/sections'
import { SectionListItem } from './SectionListItem'

export interface ManageSectionsModalProps {
    isOpen: boolean
    actionButtonsProps: ModalActionButtonsProps
}

export const ManageSectionsModal = ({
    isOpen,
    actionButtonsProps
}: ManageSectionsModalProps) => {
    const { tripId } = useTripId()
    const { data: sectionsList } = useGetSections(tripId)
    const queryClient = useQueryClient()

    const { mutateAsync: createSection, isPending } = useCreateSection()
    const { mutateAsync: updateOrder } = useUpdateSectionOrder()

    const [items, setItems] = useState(sectionsList ?? [])
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newSectionName, setNewSectionName] = useState('')
    const [inputError, setInputError] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!isPending && sectionsList) {
            setItems(sectionsList)
        }
    }, [isPending, sectionsList])

    if(isPending) {
        return <Skeleton/>
    }

    const enterNewSection = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await addNewSection()
        }
    }

    const addNewSection = async () => {
        const newName = newSectionName?.trim()

        if (!newName) {
            setInputError('Name cannot be empty.')
            return
        }
        setIsAddingNew(false)

        await createSection({
            tripId,
            request: {
                sectionName: newName,
                order: items.length + 1
            }
        }).then(async () => {
            await queryClient.invalidateQueries({ queryKey: ['sectionIds', tripId] })
            await queryClient.invalidateQueries({ queryKey: [queryKeys.getSections, tripId] })
        }).catch(() => {
            toast.error('There was an issue creating new section. Try again later.', {
                toastId: 'section-error-toast'
            })
        })
    }

    const updateSectionsOrder = async (oldIndex: number, newIndex: number) => {
        const updatedItems = arrayMove(items, oldIndex, newIndex)

        const reordered = updatedItems.map((item, index) => ({
            ...item,
            order: index + 1
        }))

        await updateOrder({
            tripId,
            request: reordered
        }).then(async () => {
            setItems(updatedItems)
            await queryClient.invalidateQueries({ queryKey: ['sectionIds', tripId] })
            await queryClient.invalidateQueries({ queryKey: [queryKeys.getSections, tripId] })
        }).catch(() => {
            toast.error('There was a problem updating the order. Try again later.', {
                toastId: 'section-error-toast'
            })
        })
    }

    return (
        <CustomModal
            testId="manage-sections-modal"
            isOpen={isOpen}
            modalTitle="Manage Sections"
            actionButtonsProps={{
                ...actionButtonsProps,
                isDisabled: isAddingNew
            }}
            size="small"
        >
            <List
                values={items}
                onChange={({ oldIndex, newIndex }) =>
                    updateSectionsOrder(oldIndex, newIndex)
                }
                renderList={({ children, props, isDragged }) => (
                    <ul
                        {...props}
                        data-testid='manage-sections-list'
                        className={classes.SectionContainer}
                        style={{
                            cursor: isDragged ? 'grabbing' : 'inherit'
                        }}
                    >
                        {children}
                    </ul>
                )}
                renderItem={({ value, props, isDragged, isSelected }) => (
                    <li
                        {...props}
                        key={value.sectionId}
                        className={classes.ListItem}
                        style={{
                            ...props.style,
                            cursor: isDragged ? 'grabbing' : 'inherit',
                            backgroundColor: isDragged || isSelected ? '#F5F5F5' : '#FFF'
                        }}
                    >
                        <SectionListItem isDragged={isDragged} sectionDetails={value}/>
                    </li>
                )}
            />

            {isAddingNew && (
                <>
                    <Box className={classnames(
                        classes.SectionContainer,
                        classes.InputContainer
                    )}>
                        <TextField
                            id="add-new-section-input"
                            variant="outlined"
                            placeholder="Enter Section Name"
                            value={newSectionName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewSectionName(event.target.value)}
                            onKeyDown={enterNewSection}
                            size="small"
                            autoFocus
                            fullWidth
                        />
                        <Tooltip title="Confirm">
                            <CheckIcon onClick={addNewSection} data-testid='confirm-new-section-icon'/>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <CancelOutlinedIcon onClick={() => setIsAddingNew(false)} data-testid='cancel-new-section-icon'/>
                        </Tooltip>
                    </Box>
                    {inputError && (
                        <InputErrorMessage error={inputError} dataTestId='new-section-invalid-input-error'/>
                    )}
                </>

            )}
            <Box className={classes.SectionContainer}>
                <Button
                    data-testid='manage-sections-add-button'
                    disabled={isAddingNew}
                    className={classnames(
                        classes.ListItem,
                        classes.AddItemButton)
                    }
                    onClick={() => setIsAddingNew(true)}
                >
                    <AddCircleOutlineOutlinedIcon/>
                    <Typography>
                        Add New
                    </Typography>
                </Button>
            </Box>
        </CustomModal>
    )
}