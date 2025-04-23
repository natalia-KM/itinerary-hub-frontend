import { Passenger, PassengersColumnProps } from '../types'
import { InformationColumn } from '../InformationColumn'
import { UserAvatar } from 'components/UserAvatar'
import { Box } from '@mui/material'
import classes from './PassengersColumn.module.scss'

const PassengersAvatars = ({ passengers }: { passengers: Passenger[] }) => {
    return (
        <Box className={classes.PassengersRow}>
            {passengers.map((passenger, index) => {
                return (
                    // <span>
                    <UserAvatar
                        key={`${passenger.lastName}-${index}`}
                        firstName={passenger.firstName}
                        lastName={passenger.lastName}
                        showTooltip
                    />
                        // </span>
                )
            })}
        </Box>
    )
}

export const PassengersColumn = ({
    passengerLabel,
    passengers
}: PassengersColumnProps) => {

    return (
        <InformationColumn
            label={passengerLabel}
            value={<PassengersAvatars passengers={passengers} />}
        />
    )
}