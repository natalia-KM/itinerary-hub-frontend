import { ManageOptionsModalProps } from './types'
import { CustomModal } from 'components/CustomModal'
import { arrayMove, List } from 'react-movable'
import { useEffect, useState } from 'react'
import classes from './ManageOptionsModal.module.scss'
import { OptionListItem } from './OptionListItem'
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import classnames from 'classnames'
import CheckIcon from '@mui/icons-material/Check'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useTripId } from 'utils'
import { useCreateOption, useGetOptions, useUpdateOptionOrders } from 'hooks/options'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { toast } from 'react-toastify'
import { InputErrorMessage } from 'components/InputErrorMessage'

export const ManageOptionsModal = ({
    sectionId,
    isOpen,
    actionButtonsProps
}: ManageOptionsModalProps) => {
    const { tripId } = useTripId()
    const { data: optionList } = useGetOptions(sectionId)
    const queryClient = useQueryClient()

    const { mutateAsync: createOption } = useCreateOption()
    const { mutateAsync: updateOrder } = useUpdateOptionOrders()

    const [items, setItems] = useState(optionList ?? [])
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newOptionName, setNewOptionName] = useState('')
    const [inputError, setInputError] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (optionList) {
            setItems(optionList)
        }
    }, [optionList])

    const enterNewOption = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await addNewOption()
        }
    }

    const addNewOption = async () => {
        const newName = newOptionName?.trim()

        if (!newName) {
            setInputError('Name cannot be empty.')
            return
        }
        setIsAddingNew(false)

        await createOption({
            tripId,
            sectionId,
            request: {
                optionName: newName,
                order: items.length + 1
            }
        }).then(async () => {
            await queryClient.invalidateQueries({ queryKey: [queryKeys.getOptions, sectionId] })
        }).catch(() => {
            toast.error('There was an issue creating new option. Try again later.')
        })
    }

    const updateOptionsOrder = async (oldIndex: number, newIndex: number) => {
        const updatedItems = arrayMove(items, oldIndex, newIndex)

        const reordered = updatedItems.map((item, index) => ({
            ...item,
            order: index + 1
        }))

        await updateOrder({
            sectionId,
            request: reordered
        }).then(async () => {
            setItems(updatedItems)
            await queryClient.invalidateQueries({ queryKey: [queryKeys.getOptions, sectionId] })
        }).catch(() => {
            toast.error('There was a problem updating the order. Try again later.')
        })
    }

    return (
        <CustomModal
            testId="manage-options-modal"
            isOpen={isOpen}
            modalTitle="Manage Options"
            actionButtonsProps={{
                ...actionButtonsProps,
                isDisabled: isAddingNew
            }}
            size="small"
        >
            <List
                values={items}
                onChange={({ oldIndex, newIndex }) =>
                    updateOptionsOrder(oldIndex, newIndex)
                }
                renderList={({ children, props, isDragged }) => (
                    <ul
                        {...props}
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
                        key={value.optionId}
                        className={classes.ListItem}
                        style={{
                            ...props.style,
                            cursor: isDragged ? 'grabbing' : 'inherit',
                            backgroundColor: isDragged || isSelected ? '#F5F5F5' : '#FFF'
                        }}
                    >
                        <OptionListItem isDragged={isDragged} optionDetails={value} sectionId={sectionId}/>
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
                            id="add-new-option-input"
                            variant="outlined"
                            placeholder="Enter Option Name"
                            value={newOptionName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewOptionName(event.target.value)}
                            onKeyDown={enterNewOption}
                            size="small"
                            autoFocus
                            fullWidth
                        />
                        <Tooltip title="Confirm">
                            <CheckIcon onClick={addNewOption}/>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <CancelOutlinedIcon onClick={() => setIsAddingNew(false)}/>
                        </Tooltip>
                    </Box>
                    {inputError && (
                        <InputErrorMessage error={inputError}/>
                    )}
                </>

            )}
            <Box className={classes.SectionContainer}>
                <Button
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