import { PassengersColumnProps } from '../types'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { useQuery } from '@tanstack/react-query'
import {
    AccommodationElementDetails,
    AccommodationType,
    accommodationTypeLabel,
    getAccommodationElement
} from 'hooks/elements'
import { Box, Skeleton, Typography } from '@mui/material'
import { ElementCard } from '../ElementCard'
import { prettifyPrice } from '../utils'
import classes from './ElementStyles.module.scss'
import dayjs from 'dayjs'
import { useElementContext, useSectionContext } from 'provider'

interface AccommElementProps {
    type?: AccommodationType
}

export const AccommElement = ({
    type
}: AccommElementProps) => {
    const { userDetails } = useUserDetailsContext()
    const { sectionId } = useSectionContext()
    const { elementId, baseElementId, optionId } = useElementContext()

    const { data: elementDetails, isPending } = useQuery<AccommodationElementDetails | undefined>({
        queryKey: ['element', elementId],
        queryFn: () => getAccommodationElement({ sectionId, optionId, baseElementId, type  })
    })

    // Only skeleton on the initial load; background refetches keep showing the
    // current card instead of unmounting it mid-interaction.
    if (isPending) {
        return (
            <Skeleton width={'100%'} height={'150px'} />
        )
    }

    if (!elementDetails || !type) {
        console.error('Could not load element')
        return null
    }

    const passengerProps: PassengersColumnProps = {
        passengerLabel: 'Guests',
        passengers: elementDetails.passengerDetailsList
    }

    const testId = `acc-${elementId}`

    return (
        <ElementCard
            elementCategory={elementDetails.elementCategory}
            elementId={elementId}
            lastUpdated={elementDetails.lastUpdatedAt}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            notes={elementDetails.notes}
            link={elementDetails.link}
            elementStatus={elementDetails.status}
            passengerProps={elementDetails.passengerDetailsList?.length > 0 ? passengerProps : undefined}
        >
            <Box className={classes.TwoColumnContainer}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} data-testid={`${testId}-date`}>
                        {dayjs(elementDetails.dateTime).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'18px'} data-testid={`${testId}-place`}>
                        {elementDetails.place}
                    </Typography>
                    <Typography variant="body2"  fontSize={'16px'} data-testid={`${testId}-location`}>
                        {elementDetails.location}
                    </Typography>
                </Box>
                <Box className={classes.AccommTimeBox}>
                        <Typography fontSize={'16px'} data-testid={`${testId}-time`}>
                            {dayjs(elementDetails.dateTime).format('HH:mm')}
                        </Typography>
                        <Typography variant="body2" fontSize={'small'} sx={{ color: 'text.secondary' }}>
                            {accommodationTypeLabel(type)}
                        </Typography>
                </Box>
            </Box>
        </ElementCard>
    )
}