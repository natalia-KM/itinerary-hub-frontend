import { TopBar } from 'modules/TopBar'
import { useMutateAllTrips } from 'hooks/useGetAllTrips/useMutateAllTrips'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { AddTripCard } from './AddTripCard/AddTripCard'
import classes from './TripsView.module.scss'
import { TripViewCard } from './TripViewCard/TripViewCard'
import { toast } from 'react-toastify'

export const TripsView = () => {
    const { trips, isLoading, isError } = useMutateAllTrips()

    if(isError) {
        toast('There was an error getting your trips', {
            type: 'error',
            toastId: 'get-all-trips-error-toast'
        })
    }

    if(isLoading) {
        return (
            <Backdrop
                data-testid='trips-view-loading'
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
                {trips?.map((trip, index) => {
                    return (
                        <TripViewCard
                            index={index}
                            key={`${trip.tripId}`}
                            tripInfo={trip}
                        />
                    )
                })}
            </Box>
        </div>
    )
}