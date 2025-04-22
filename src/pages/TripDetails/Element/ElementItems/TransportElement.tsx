import { useQuery } from '@tanstack/react-query'
import { getTransportElement, TransportElementDetails } from 'hooks/elements'
import { ElementCard } from '../ElementCard'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { prettifyPrice } from '../utils'
import { Box, Skeleton, Typography } from '@mui/material'
import { GetElementArgs, PassengersColumnProps } from '../types'
import dayjs from 'dayjs'
import classes from './ElementStyles.module.scss'
import { TimeLine } from './TimeLine'

export const TransportElement = ({
    sectionId,
    optionId,
    elementId,
    baseElementId
}: GetElementArgs) => {
    const { userDetails } = useUserDetailsContext()

    const { data: elementDetails, isPending, isRefetching } = useQuery<TransportElementDetails | undefined>({
        queryKey: ['element', elementId],
        queryFn: () => getTransportElement({ sectionId, optionId, baseElementId })
    })

    if (isPending || isRefetching) {
        return (
            <Skeleton/>
        )
    }

    if (!elementDetails) {
        console.error('Could not load element')
        return null
    }

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

    const passengerProps: PassengersColumnProps = {
        passengerLabel: 'Passengers',
        passengers: elementDetails.passengerDetailsList
    }

    return (
        <ElementCard
            elementCategory={elementDetails.elementCategory}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            notes={elementDetails.notes}
            elementStatus={elementDetails.status}
            passengerProps={elementDetails.passengerDetailsList.length > 0 ? passengerProps : undefined}
            additionalColumn={elementDetails.provider ? providerColumn : undefined}
        >
            <Box className={classes.TransportBodyContainer}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {dayjs(elementDetails.originDateTime).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'22px'}>
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
                    <Typography fontSize={'22px'}>
                        {elementDetails.destinationPlace}
                    </Typography>
                    <Typography variant="body2" fontSize={'16px'}>
                        {dayjs(elementDetails.destinationDateTime).format('HH:mm')}
                    </Typography>
                </Box>
            </Box>
        </ElementCard>
    )
}