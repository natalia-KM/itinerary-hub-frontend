import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import classnames from 'classnames'
import classes from './PassengerForm.module.scss'
import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckIcon from '@mui/icons-material/Check'
import { useCreatePassenger } from 'hooks/passengers'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { InputErrorMessage } from 'components/InputErrorMessage'

interface AddPassengerFormProps {
    cancelOp: () => void
}

export const AddPassengerForm = ({
    cancelOp
}: AddPassengerFormProps) => {
    const queryClient = useQueryClient()
    const { mutateAsync: createPassenger } = useCreatePassenger()
    const [newPassengerFirstName, setNewPassengerFirstName] = useState('')
    const [newPassengerLastName, setNewPassengerLastName] = useState('')
    const [newPassengerErrors, setNewPassengerErrors] = useState<string | undefined>()

    const addNewPassenger = async () => {
        if (newPassengerFirstName.trim() !== '' && newPassengerLastName !== '') {
            await createPassenger({
                firstName: newPassengerFirstName,
                lastName: newPassengerLastName,
                avatar: 'default'
            }).then(() => {
                queryClient.invalidateQueries({ queryKey: [queryKeys.getAllPassengers] })
            }).catch(() => {
                toast.error('Couldn\'t add a passenger. Try again later')
            }).finally(() => {
                cancelOp()
            })
        } else {
            setNewPassengerErrors('The fields cannot be empty.')
        }
    }

    return (
        <Box
            data-testid={'passengers-add-form'}
            className={classnames(
                classes.AddPassengerForm
            )}
        >
            <Divider/>
            <Typography sx={{ color: 'white', textAlign: 'center', mt: '3px' }}>
                Add new passenger
            </Typography>
            <TextField
                id="add-new-passenger-first-name-input"
                variant="standard"
                className={classes.TextField}
                placeholder="First Name"
                value={newPassengerFirstName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassengerFirstName(event.target.value)}
                size="small"
                autoFocus
                slotProps={{ htmlInput: { 'data-testid': 'passengers-add-first-name' } }}
            />
            <TextField
                id="add-new-passenger-last-name-input"
                variant="standard"
                className={classes.TextField}
                placeholder="Last Name"
                value={newPassengerLastName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassengerLastName(event.target.value)}
                size="small"
                slotProps={{ htmlInput: { 'data-testid': 'passengers-add-first-name' } }}
            />
            {newPassengerErrors && (
                <InputErrorMessage
                    dataTestId={'passenger-form-input-error'}
                    error={newPassengerErrors}
                />
            )}
            <Box className={classes.AddPassengerForm__IconContainer}>
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
                    onClick={addNewPassenger}
                >
                    Add
                </Button>
            </Box>
        </Box>
    )
}