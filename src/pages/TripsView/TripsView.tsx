import { TopBar } from 'modules/TopBar'
import { useMutateAllTrips } from 'hooks/useGetAllTrips/useMutateAllTrips'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { AddTripCard } from './AddTripCard/AddTripCard'
import classes from './TripsView.module.scss'
import { TripViewCard } from './TripViewCard/TripViewCard'

export const TripsView = () => {
    const { trips, isLoading } = useMutateAllTrips()

    if(isLoading) {
        return (
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <div className={classes.TripsView}>
            <TopBar/>
            <Box className={classes.TripsView__TripsContainer}>
                <AddTripCard />
                {trips?.map((trip) => {
                    return (
                        <TripViewCard
                            key={`${trip.tripId}`}
                            tripInfo={trip}
                        />
                    )
                })}
            </Box>
        </div>
    )
}