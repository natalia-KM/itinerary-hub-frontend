import { TopBar } from 'modules/TopBar'
import { Box, Button, Typography } from '@mui/material'
import { Section } from './Section'
import classes from './TripDetails.module.scss'
import { TripHeader } from './TripHeader/TripHeader'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import classnames from 'classnames'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useTripId } from 'utils'
import { getSections } from 'hooks/sections'
import React, { useState } from 'react'
import { TripQuickActions } from './TripQuickActions/TripQuickActions'
import { PassengerDrawer } from '../TripsView/PassengerDrawer/PassengerDrawer'
import { AddSectionModal } from './TripQuickActions/AddSectionModal/AddSectionModal'

export const TripDetails = () => {
    const navigate = useNavigate()
    const { tripId } = useTripId()

    const [addSectionModalOpen, setAddSectionModalOpen] = useState(false)

    const { data: sectionIds } = useQuery<string[]>({
        queryKey: ['sectionIds', tripId],
        queryFn: () => getSections(tripId).then(r => r.map(s => s.sectionId))
    })

    const redirectToTripList = () => {
        navigate('/dashboard')
    }

    return (
        <div className={classes.Page}>
            <TopBar/>
            <PassengerDrawer/>
            <Box className={classes.TripDetails}>
                <Box className={classnames(
                    classes.TripDetails__Sidebar,
                    classes.TripDetails__LinkContainer
                )}>
                    <Box
                        data-testid="trip-details-go-back-link"
                        onClick={redirectToTripList}
                        className={classes.TripDetails__TextWithLink}
                    >
                        <ArrowBackIcon fontSize={'small'}/>
                        <Typography>
                            Trip List
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.TripDetails__TripView}>
                    <TripHeader/>

                    {sectionIds?.length === 0 && (
                        <>
                            <Box className={classes.EmptySection}>
                                <Typography>
                                    There are no sections in this trip.
                                </Typography>
                                <Button onClick={() => setAddSectionModalOpen(true)}>
                                    Create new section
                                </Button>
                            </Box>
                            <AddSectionModal
                                modalOpen={addSectionModalOpen}
                                setModalOpen={setAddSectionModalOpen}
                            />
                        </>
                    )}

                    {sectionIds?.map((sectionId) => (
                        <Section key={sectionId} sectionId={sectionId}/>
                    ))}
                </Box>
                <Box className={classes.TripDetails__Sidebar}>
                    <TripQuickActions/>
                </Box>
            </Box>
        </div>
    )
}