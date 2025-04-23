import { TopBar } from 'modules/TopBar'
import { Box, Fab, Typography } from '@mui/material'
import { Section } from './Section'
import classes from './TripDetails.module.scss'
import { TripHeader } from './TripHeader/TripHeader'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import classnames from 'classnames'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useTripId } from 'utils'
import { getSections } from 'hooks/sections'

// TODO: no section screen / add on BE to create a section & option when new trip created
export const TripDetails = () => {
    const navigate = useNavigate()

    const { tripId } = useTripId()

    const { data: sectionIds } = useQuery<string[]>({ queryKey: ['sectionIds', tripId], enabled: false,
        queryFn: () => getSections(tripId)
            .then((response) => {
                return response.map((section) => section.sectionId)
             })
    })

    const redirectToTripList = () => {
        navigate('/dashboard')
    }

    return (
        <div className={classes.Page}>
            <TopBar/>
            <Box className={classes.TripDetails}>
                <Box className={classnames(
                    classes.TripDetails__Sidebar,
                    classes.TripDetails__LinkContainer
                )}>
                    <Box
                        data-testid='trip-details-go-back-link'
                        onClick={redirectToTripList}
                        className={classes.TripDetails__TextWithLink}
                    >
                        <ArrowBackIcon fontSize={'small'}/>
                        <Typography>
                            Go back to trips
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.TripDetails__TripView}>
                    <TripHeader />

                    {sectionIds?.length === 0 && (
                        <Box>
                            Create a new section
                        </Box>
                    )}

                    {sectionIds?.map((sectionId) => (
                        <Section key={sectionId} sectionId={sectionId}/>
                    ))}
                </Box>
                <Box className={classes.TripDetails__Sidebar}>
                    <Box className={classes.TripDetails__Fab}>
                        <Fab color="primary" aria-label="Manage Trip Button">
                            <AddIcon />
                        </Fab>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}