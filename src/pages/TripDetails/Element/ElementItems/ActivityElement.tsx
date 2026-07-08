import { PassengersColumnProps } from '../types'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { useQuery } from '@tanstack/react-query'
import { ActivityElementDetails, getActivityElement } from 'hooks/elements'
import { Box, Skeleton, Typography } from '@mui/material'
import { ElementCard } from '../ElementCard'
import { prettifyPrice } from '../utils'
import dayjs from 'dayjs'
import classes from './ElementStyles.module.scss'
import { useElementContext, useSectionContext } from 'provider'

export const ActivityElement = () => {
    const { userDetails } = useUserDetailsContext()
    const { sectionId } = useSectionContext()
    const { elementId, baseElementId, optionId } = useElementContext()

    const { data: elementDetails, isPending } = useQuery<ActivityElementDetails | undefined>({
        queryKey: ['element', elementId],
        queryFn: () => getActivityElement({ sectionId, optionId, baseElementId })
    })

    // Only skeleton on the initial load; background refetches keep showing the
    // current card instead of unmounting it mid-interaction.
    if (isPending) {
        return (
            <Skeleton width={'100%'} height={'150px'} />
        )
    }

    if (!elementDetails) {
        console.error('Could not load element')
        return null
    }

    const durationColumn = {
        label: 'Duration',
        value: `${Math.floor((elementDetails.duration ?? 0) / 60)}h ${(elementDetails.duration ?? 0) % 60}m`
    }

    const passengerProps: PassengersColumnProps = {
        passengerLabel: 'Guests',
        passengers: elementDetails.passengerDetailsList
    }

    const testId = `act-${elementId}`

    return (
        <ElementCard
            elementCategory={elementDetails.elementCategory}
            elementId={elementId}
            lastUpdated={elementDetails.lastUpdatedAt}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            notes={elementDetails.notes}
            link={elementDetails.link}
            elementStatus={elementDetails.status}
            passengerProps={elementDetails.passengerDetailsList.length > 0 ? passengerProps : undefined}
            additionalColumn={elementDetails.duration ? durationColumn : undefined}
        >
            <Box className={classes.TwoColumnContainer}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} data-testid={`${testId}-starts-at-date`}>
                        {dayjs(elementDetails.startsAt).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'18px'} data-testid={`${testId}-activity-name`}>
                        {elementDetails.activityName}
                    </Typography>
                    <Typography variant="body2"  fontSize={'16px'} data-testid={`${testId}-location`}>
                        {elementDetails.location}
                    </Typography>
                </Box>
                <Box className={classes.ActivityTimeBox}>
                    <Box>
                    <Typography fontSize={'16px'} data-testid={`${testId}-starts-at-time`}>
                        {dayjs(elementDetails.startsAt).format('HH:mm')}
                    </Typography>
                    <Typography variant="body2" fontSize={'small'} sx={{ color: 'text.secondary' }}>
                        Begins
                    </Typography>
                    </Box>
                    {elementDetails.duration && elementDetails.startsAt && (
                        <Box>
                            <Typography fontSize={'16px'} data-testid={`${testId}-ends-at-time`}>
                                {dayjs(elementDetails.startsAt).add(elementDetails.duration, 'minute').format('HH:mm')}
                            </Typography>
                            <Typography variant="body2" fontSize={'small'} sx={{ color: 'text.secondary' }}>
                                Ends
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </ElementCard>
    )
}