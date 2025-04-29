import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { queryKeys } from 'config/queryKeys'
import { toast } from 'react-toastify'
import { Box, Button, TextField, Typography } from '@mui/material'
import classnames from 'classnames'
import classes from './PassengerForm.module.scss'
import { InputErrorMessage } from 'components/InputErrorMessage'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckIcon from '@mui/icons-material/Check'
import { PassengerDetails } from 'hooks/elements'
import { useUpdatePassenger } from 'hooks/passengers/useUpdatePassenger'

interface EditPassengerFormProps{
    passenger: PassengerDetails
    cancelOp: () => void
}

export const EditPassengerForm = ({
    passenger,
    cancelOp
}: EditPassengerFormProps) => {
    const queryClient = useQueryClient()
    const { mutateAsync: updatePassenger } = useUpdatePassenger()
    const [newPassengerFirstName, setNewPassengerFirstName] = useState(passenger.firstName)
    const [newPassengerLastName, setNewPassengerLastName] = useState(passenger.lastName)
    const [newPassengerErrors, setNewPassengerErrors] = useState<string | undefined>()

    const editPassenger = async () => {
        if(newPassengerFirstName === passenger.firstName && newPassengerLastName === passenger.lastName) {
            cancelOp()
            return
        }

        if (newPassengerFirstName.trim() !== '' && newPassengerLastName.trim() !== '') {
            await updatePassenger({
                passengerId: passenger.passengerId,
                request: {
                    firstName: newPassengerFirstName,
                    lastName: newPassengerLastName
                }
            }).then(() => {
                queryClient.invalidateQueries({ queryKey: [queryKeys.getAllPassengers] })
            }).catch(() => {
                toast.error('Couldn\'t update passenger. Try again later', { toastId: 'passenger-form-error-toast' })
            }).finally(() => {
                cancelOp()
            })
        } else {
            setNewPassengerErrors('The fields cannot be empty.')
        }
    }

    return (
        <Box
            data-testid={'passengers-modify-form'}
            className={classnames(
                classes.EditPassengerForm
            )}
        >
            <Typography sx={{ color: 'white', textAlign: 'center', mt: '3px' }}>
                Update passenger
            </Typography>
            <TextField
                id="edit-passenger-first-name-input"
                variant="standard"
                className={classes.TextField}
                placeholder="First Name"
                value={newPassengerFirstName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassengerFirstName(event.target.value)}
                size="small"
                autoFocus
                slotProps={{ htmlInput: { 'data-testid': 'passengers-edit-first-name' } }}
            />
            <TextField
                id="edit-passenger-last-name-input"
                variant="standard"
                className={classes.TextField}
                placeholder="Last Name"
                value={newPassengerLastName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassengerLastName(event.target.value)}
                size="small"
                slotProps={{ htmlInput: { 'data-testid': 'passengers-edit-last-name' } }}
            />
            {newPassengerErrors && (
                <InputErrorMessage
                    dataTestId={'passenger-form-input-error'}
                    error={newPassengerErrors}
                />
            )}
            <Box className={classes.EditPassengerForm__IconContainer}>
                <Button
                    data-testid={'passengers-form-cancel-icon'}
                    size={'small'}
                    variant="outlined"
                    endIcon={<CancelOutlinedIcon />}
                    onClick={cancelOp}
                >
                    Cancel
                </Button>
                <Button
                    data-testid={'passengers-form-confirm-icon'}
                    size={'small'}
                    variant="contained"
                    endIcon={<CheckIcon />}
                    onClick={editPassenger}
                >
                    Update
                </Button>
            </Box>
        </Box>
    )
}