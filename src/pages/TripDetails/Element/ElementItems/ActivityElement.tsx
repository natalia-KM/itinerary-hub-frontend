import { GetElementArgs, PassengersColumnProps } from '../types'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { useQuery } from '@tanstack/react-query'
import { ActivityElementDetails, getActivityElement } from 'hooks/elements'
import { Box, Skeleton, Typography } from '@mui/material'
import { ElementCard } from '../ElementCard'
import { prettifyPrice } from '../utils'
import dayjs from 'dayjs'
import classes from './ElementStyles.module.scss'

export const ActivityElement = ({
    sectionId,
    optionId,
    elementId,
    baseElementId
}: GetElementArgs) => {
    const { userDetails } = useUserDetailsContext()

    const { data: elementDetails, isPending, isRefetching } = useQuery<ActivityElementDetails | undefined>({
        queryKey: ['element', elementId],
        queryFn: () => getActivityElement({ sectionId, optionId, baseElementId })
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

    const durationColumn = {
        label: 'Duration',
        value: `${Math.floor((elementDetails.duration ?? 0) / 60)}h ${(elementDetails.duration ?? 0) % 60}m`
    }

    const passengerProps: PassengersColumnProps = {
        passengerLabel: 'Guests',
        passengers: elementDetails.passengerDetailsList
    }

    return (
        <ElementCard
            elementCategory={elementDetails.elementCategory}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            notes={elementDetails.notes}
            elementStatus={elementDetails.status}
            passengerProps={elementDetails.passengerDetailsList.length > 0 ? passengerProps : undefined}
            additionalColumn={elementDetails.duration ? durationColumn : undefined}
        >
            <Box className={classes.TwoColumnContainer}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {dayjs(elementDetails.startsAt).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'18px'}>
                        {elementDetails.activityName}
                    </Typography>
                    <Typography variant="body2"  fontSize={'16px'}>
                        {elementDetails.location}
                    </Typography>
                </Box>
                <Box className={classes.ActivityTimeBox}>
                    <Box>
                    <Typography fontSize={'16px'}>
                        {dayjs(elementDetails.startsAt).format('HH:mm')}
                    </Typography>
                    <Typography variant="body2" fontSize={'small'} sx={{ color: 'text.secondary' }}>
                        Begins
                    </Typography>
                    </Box>
                    {elementDetails.duration && elementDetails.startsAt && (
                        <Box>
                            <Typography fontSize={'16px'}>
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