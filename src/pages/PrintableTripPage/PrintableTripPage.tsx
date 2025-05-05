import classes from './PrintableTripPage.module.scss'
import { useEffect, useMemo, useRef } from 'react'
import { SelectedOptionsMap } from 'provider/TripStateProvider/TripStateContext'
import { TripNotFoundError } from 'modules/TripNotFoundError'
import { LoadingBackdrop } from 'modules/LoadingBackdrop'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { getDatesText, useTripId } from 'utils'
import { useGetTrip } from 'hooks/trips'
import {
    AccommodationElementDetails,
    ActivityElementDetails,
    ElementType,
    TransportElementDetails
} from 'hooks/elements'
import { PrintableTransportCard } from './PrintableElements/PrintableTransportCard'
import { PrintableActivityCard } from './PrintableElements/PrintableActivityCard'
import { PrintableAccommCard } from './PrintableElements/PrintableAccommCard'

export const PrintableTripPage = () => {

    const { tripId } = useTripId()
    const { data: trip, isLoading, isError } = useGetTrip({ tripId: tripId })

    const datesDisplayText = useMemo(() => {
        return getDatesText(trip?.tripDetails.startDate, trip?.tripDetails.endDate)
    }, [trip?.tripDetails.endDate, trip?.tripDetails.startDate])

    const selectedOptions = useMemo<SelectedOptionsMap>(() => {
        const stored = sessionStorage.getItem('selectedOptions')
        try {
            return stored ? (JSON.parse(stored) as SelectedOptionsMap) : {}
        } catch {
            return {}
        }
    }, [])

    const hasPrintedRef = useRef(false) // ensures print window is only opened once

    useEffect(() => {
        if (!isLoading && !isError && trip && selectedOptions) {
            hasPrintedRef.current = true
            window.print()
        }
    }, [isError, isLoading, selectedOptions, trip])

    if (isLoading) {
        return (<LoadingBackdrop isOpen={true} testId="trip-download-page-loading"/>)
    }

    if (isError || !trip) {
        return (<TripNotFoundError/>)
    }

    const redirectToHome = () => {
        window.location.href = '/dashboard'
    }

    return (
        <>
            <style>
                {`
                  @media print {
                    @page {
                      size: A4;
                      margin: 0;
                    }
             
                    .no-print {
                      display: none;
                    }
                  }
                `}
            </style>
            <AppBar position={'static'} className={classes.TopBar} data-testid="top-bar">
                <Toolbar>
                    <Box
                        sx={{ md: 'flex' }}
                        onClick={redirectToHome}
                        className={classes.TopBar__Logo}
                        data-testid="top-bar-logo"
                    >
                        <img src="logo.png" alt="logo"/>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className={classes.Page}>
                <Box className={classes.Content}>
                    <Box className={classes.TripHeader}>
                        <Typography sx={{ fontSize: '28px' }}>
                            {trip.tripDetails.tripName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '17px' }}>
                            {datesDisplayText}
                        </Typography>
                    </Box>
                    {trip.sections.map((section) => {
                        return section.options.map((option) => {
                            const optionId = option.optionDetails.optionId
                            const selectedOption = selectedOptions[section.sectionDetails.sectionId]
                            const isOpened = selectedOption === optionId

                            if (!isOpened || option.baseElementDetails.length === 0) {
                                return null
                            }

                            return (
                                <Box className={classes.Section}>
                                    <Typography
                                        sx={{ fontSize: '18px', paddingLeft: '8px', color: 'text.secondary' }}>
                                        {section.sectionDetails.sectionName}
                                    </Typography>
                                    <Box>
                                        {option.baseElementDetails.map((element) => {
                                                switch (element.elementType) {
                                                    case ElementType.TRANSPORT: {
                                                        const transportElement = element as TransportElementDetails
                                                        return (
                                                            <PrintableTransportCard elementDetails={transportElement}/>
                                                        )
                                                    }
                                                    case ElementType.ACTIVITY: {
                                                        const activityElement = element as ActivityElementDetails
                                                        return (<PrintableActivityCard elementDetails={activityElement}/>)
                                                    }
                                                    case ElementType.ACCOMMODATION: {
                                                        const accommElement = element as AccommodationElementDetails
                                                        return (<PrintableAccommCard elementDetails={accommElement}/>)
                                                    }
                                                }
                                            }
                                        )}
                                    </Box>
                                </Box>
                            )
                        })
                    })}
                </Box>
            </div>
        </>
    )
}