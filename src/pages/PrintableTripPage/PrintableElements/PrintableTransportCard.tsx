import { TransportElementDetails } from 'hooks/elements'
import { useUserDetailsContext } from 'provider'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import classes from './PrintableElementCard.module.scss'
import { PrintableElementCard } from './PrintableElementCard'
import { prettifyPrice } from 'pages/TripDetails/Element/utils'
import { TimeLine } from 'pages/TripDetails/Element/ElementItems/TimeLine'

interface PrintableTransportCardProps {
    elementDetails: TransportElementDetails
}

export const PrintableTransportCard = ({
    elementDetails
}: PrintableTransportCardProps) => {
    const { userDetails } = useUserDetailsContext()

    const providerColumn = {
        label: 'Provider',
        value: elementDetails.provider
    }

    const timeDifference = () => {
        const endDate = dayjs(elementDetails.destinationDateTime)
        const startDate = dayjs(elementDetails.originDateTime)
        const diffInMinutes = endDate.diff(startDate, 'minutes')

        if (!diffInMinutes) return undefined

        const hours = Math.floor(diffInMinutes / 60)
        const minutes = diffInMinutes % 60

        if (minutes === 0) {
            return `${hours}h`
        }

        return `${hours}.${minutes}h`
    }

    return (
        <PrintableElementCard
            elementCategory={elementDetails.elementCategory}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            link={elementDetails.link}
            notes={elementDetails.notes}
            elementStatus={elementDetails.status}
            passengersList={elementDetails.passengerDetailsList}
            additionalColumn={elementDetails.provider ? providerColumn : undefined}
        >
            <Box className={classes.TransportBodyContainer}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {dayjs(elementDetails.originDateTime).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'18px'}>
                        {elementDetails.originPlace}
                    </Typography>
                    <Typography variant="body2"  fontSize={'16px'}>
                        {dayjs(elementDetails.originDateTime).format('HH:mm')}
                    </Typography>
                </Box>
                <TimeLine duration={timeDifference()} />
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {dayjs(elementDetails.destinationDateTime).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'18px'}>
                        {elementDetails.destinationPlace}
                    </Typography>
                    <Typography variant="body2" fontSize={'16px'}>
                        {dayjs(elementDetails.destinationDateTime).format('HH:mm')}
                    </Typography>
                </Box>
            </Box>
        </PrintableElementCard>
    )
}