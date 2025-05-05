import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { AccommodationElementDetails, AccommodationType, accommodationTypeLabel } from 'hooks/elements'
import { Box, Typography } from '@mui/material'
import classes from './PrintableElementCard.module.scss'
import dayjs from 'dayjs'
import { PrintableElementCard } from './PrintableElementCard'
import { prettifyPrice } from 'pages/TripDetails/Element/utils'

interface PrintableAccommCardProps {
    elementDetails: AccommodationElementDetails
    type?: AccommodationType
}

export const PrintableAccommCard = ({
    elementDetails
}: PrintableAccommCardProps) => {
    const { userDetails } = useUserDetailsContext()

    return (
        <PrintableElementCard
            elementCategory={elementDetails.elementCategory}
            price={prettifyPrice(userDetails?.currency ?? 'USD', elementDetails.price)}
            notes={elementDetails.notes}
            link={elementDetails.link}
            elementStatus={elementDetails.status}
            passengersList={elementDetails.passengerDetailsList}
        >
            <Box className={classes.TwoColumnContainer}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {dayjs(elementDetails.dateTime).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography fontSize={'18px'}>
                        {elementDetails.place}
                    </Typography>
                    <Typography variant="body2"  fontSize={'16px'}>
                        {elementDetails.location}
                    </Typography>
                </Box>
                <Box className={classes.AccommTimeBox}>
                    <Typography fontSize={'16px'}>
                        {dayjs(elementDetails.dateTime).format('HH:mm')}
                    </Typography>
                    <Typography variant="body2" fontSize={'small'} sx={{ color: 'text.secondary' }}>
                        {accommodationTypeLabel(elementDetails.accommodationType)}
                    </Typography>
                </Box>
            </Box>
        </PrintableElementCard>
    )
}