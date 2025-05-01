import React, { useState } from 'react'
import { Box, MenuItem, Select, TableCell, Typography } from '@mui/material'
import classes from './AccountInfoModal.module.scss'
import classnames from 'classnames'
import { getCurrencySymbol } from 'pages/TripDetails/Element/utils'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { toast } from 'react-toastify'
import { useUpdateUserDetails } from 'hooks/useUpdateUserDetails'

const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'NZD', name: 'New Zealand Dollar' }
]

export const SelectCurrencyCell = () => {
    const { userDetails, invalidateUserDetails } = useUserDetailsContext()
    const { mutateAsync: updateUserDetails } = useUpdateUserDetails()

    const [isEditing, setIsEditing] = useState(false)

    const onCurrencyChange = async (newCurrency: string) => {
        setIsEditing(false)

        if (!newCurrency || newCurrency === userDetails?.currency) {
            return
        }
        await updateUserDetails({
            currency: newCurrency
        }).then(() => {
            invalidateUserDetails()
        }).catch((e) => {
            console.error(e)
            toast.error('Couldn\'t update the currency. Try again later', { toastId: 'update-user-error-toast' })
        })
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
                        data-testid={'currency-cell-value'}
                        className={classes.DisplayText__Text}
                    >
                        {userDetails?.currency ?? 'USD'}
                    </Typography>
                </Box>
            )}
            {isEditing && (
                <Select
                    data-testid="currency-select"
                    className={classes.Dropdown}
                    value={userDetails?.currency ?? 'USD'}
                    renderValue={(selected) => selected}
                    onChange={e => onCurrencyChange(e.target.value)}
                    onClose={() => setIsEditing(false)}
                    slotProps={{
                        input: { sx: { padding: '5px 12px', width: '100%' } }
                    }}
                >
                    {currencies.map(({ code, name }) => (
                        <MenuItem
                            key={code}
                            value={code}
                            className={classes.Dropdown__MenuItem}
                            data-testid={`${code}-currency-item`}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
                                    {code}
                                </Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                    {name}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                {getCurrencySymbol(code)}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            )}
        </TableCell>
    )
}