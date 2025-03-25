import { TopBar } from 'modules/TopBar'
import { useSearchParams } from 'react-router'
import { Box, Typography } from '@mui/material'

export const TripDetails = () => {
    const [searchParams] = useSearchParams()
    const tripId = searchParams.get('tripId')

    if(!tripId) {
        return (
            <div>Cannot load the trip</div>
        )
    }

    return (
        <div>
            <TopBar/>
            <Box>
                <Typography>
                    TripId: {tripId}
                </Typography>
            </Box>
        </div>
    )
}