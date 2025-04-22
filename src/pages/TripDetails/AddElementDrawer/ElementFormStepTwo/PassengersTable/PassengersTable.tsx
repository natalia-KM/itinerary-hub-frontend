import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material'
import { useState } from 'react'
import { UserAvatar } from 'components/UserAvatar'
import classnames from 'classnames'
import classes from './PassengersTable.module.scss'
import { useGetPassengers } from 'hooks/passengers/useGetPassengers/useGetPassengers'
import { FormSchema } from 'pages/TripDetails/AddElementDrawer/formSchema'
import { useFormContext } from 'react-hook-form'

interface PassengersTableProps {
    label: 'Passenger' | 'Guest'
}

export const PassengersTable = ({
    label
}: PassengersTableProps) => {
    const [checked, setChecked] = useState<string[]>([])
    const { data: passengerDetailsList, isLoading } = useGetPassengers()
    const { setValue } = useFormContext<FormSchema>()

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setValue('passengerIds', newChecked)
        setChecked(newChecked)
    }

    if(isLoading) {
        return (
            <Skeleton sx={{ minHeight: '50px' }}/>
        )
    }

    if(!passengerDetailsList || passengerDetailsList.length === 0) {
        return (
            <Typography color={'error'}>
                There was a problem retrieving the {label}s in this account.
            </Typography>
        )
    }

    return (
        <Box>
            <List dense>
                {passengerDetailsList.map((passenger, index) => {
                    return (
                        <ListItem
                            key={passenger.passengerId}
                            disablePadding
                        >
                            <ListItemButton
                                onClick={handleToggle(passenger.passengerId)}
                                className={classnames(
                                    index === 0 ? classes.FirstItem : classes.ListItem,
                                    checked.includes(passenger.passengerId) && classes.Selected
                                )}
                                dense
                            >
                                <ListItemIcon sx={{ minWidth: '36px' }}>
                                    <UserAvatar
                                        firstName={passenger.firstName}
                                        lastName={passenger.lastName}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    {passenger.firstName} {passenger.lastName}
                                </ListItemText>

                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} textAlign={'right'}>
                Selected {label}s: {checked.length}
            </Typography>
        </Box>
    )
}