import { EditPassengerForm } from './PassengerForm/EditPassengerForm'
import { Box, IconButton, ListItem, ListItemText } from '@mui/material'
import classes from './PassengerDrawer.module.scss'
import { UserAvatar } from 'components/UserAvatar'
import classnames from 'classnames'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState } from 'react'
import { PassengerDetails } from 'hooks/elements'
import { DeletePassengerModal } from './DeletePassengerModal/DeletePassengerModal'

interface PassengerProps {
    passenger: PassengerDetails
    editMode: boolean
    closeAddingNew: () => void
    /**
     * As the parent component (Drawer) can't close the editing, it passes
     * closeModifying boolean, which can close the editing state for the passenger
     */
    closeModifying: boolean
}

export const Passenger = ({
    passenger,
    editMode,
    closeAddingNew,
    closeModifying
}: PassengerProps) => {
    const [isEditingPassenger, setIsEditingPassenger] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    useEffect(() => {
        if(closeModifying) {
            setIsEditingPassenger(false)
        }
    }, [closeModifying])

    const enableModify = () => {
        closeAddingNew()
        setIsEditingPassenger(true)
    }

    return (
        <>
            {isEditingPassenger && (
                <EditPassengerForm
                    passenger={passenger}
                    cancelOp={() => {
                        setIsEditingPassenger(false)
                    }}
                />
            )}
            {!isEditingPassenger && (
                <ListItem className={classes.ListItem}>
                    <UserAvatar
                        firstName={passenger.firstName}
                        lastName={passenger.lastName}
                        showTooltip={false}
                        enablePaddingRight={true}
                    />
                    <ListItemText
                        data-testid={`passengers-${passenger.passengerId}-full-name`}
                        sx={{ color: 'white' }}
                        primary={`${passenger.firstName} ${passenger.lastName}`}
                    />
                    <Box sx={{ flexGrow: 1 }}/>
                    {editMode && (
                        <>
                            <IconButton className={classnames(
                                classes.ListItem__Icon
                            )}>
                                <EditIcon
                                    data-testid={`passengers-${passenger.passengerId}-modify-icon`}
                                    onClick={enableModify}
                                    className={classes.natural}
                                    fontSize={'small'}
                                    sx={{ color: 'white' }}
                                />
                            </IconButton>
                            <IconButton  className={classnames(
                                classes.ListItem__Icon,
                                classes.error
                            )}>
                                <DeleteIcon
                                    data-testid={`passengers-${passenger.passengerId}-delete-icon`}
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className={classes.error}
                                    fontSize={'small'}
                                    sx={{ color: 'white' }}
                                />
                            </IconButton>
                        </>
                    )}
                </ListItem>
            )}
            <DeletePassengerModal
                passenger={passenger}
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
            />
        </>
    )
}