import { Passenger, PassengersColumnProps } from '../types'
import { InformationColumn } from '../InformationColumn'
import { UserAvatar } from 'components/UserAvatar'
import { Box } from '@mui/material'
import classes from './PassengersColumn.module.scss'
import { useElementContext } from 'provider'

const PassengersAvatars = ({ passengers }: { passengers: Passenger[] }) => {
    const { elementId } = useElementContext()

    return (
        <Box className={classes.PassengersRow}>
            {passengers.map((passenger, index) => {
                return (
                    <UserAvatar
                        key={`${passenger.lastName}-${index}`}
                        firstName={passenger.firstName}
                        lastName={passenger.lastName}
                        testId={`${elementId}-passenger-${index}-avatar`}
                        showTooltip
                    />
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