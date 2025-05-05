import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { ActivityElementDetails } from 'hooks/elements'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import classes from './PrintableElementCard.module.scss'
import { PrintableElementCard } from './PrintableElementCard'
import { prettifyPrice } from 'pages/TripDetails/Element/utils'

interface PrintableActivityCardProps {
    elementDetails: ActivityElementDetails
}

export const PrintableActivityCard = ({
    elementDetails
}: PrintableActivityCardProps) => {
    const { userDetails } = useUserDetailsContext()

    const durationColumn = {
        label: 'Duration',
        value: `${Math.floor((elementDetails.duration ?? 0) / 60)}h ${(elementDetails.duration ?? 0) % 60}m`
    }

    return (
        <PrintableElementCard
            elementCategory={elementDetails.elementCategory}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            notes={elementDetails.notes}
            link={elementDetails.link}
            elementStatus={elementDetails.status}
            passengersList={elementDetails.passengerDetailsList}
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
                    <Typography variant="body2"  fontSize={'14px'}>
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
        </PrintableElementCard>
    )
}