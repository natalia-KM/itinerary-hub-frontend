import { Card, CardContent, Grid2, Tooltip, Typography } from '@mui/material'
import { prettifyDate, TripDetails } from 'utils'
import OutsideAlerter from 'utils/OutsideAlerter'

import classes from './TripViewCard.module.scss'
import { useMemo, useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { ActionPanel } from './ActionPanel/ActionPanel'
import { useNavigate } from 'react-router'

interface TripViewCardProps {
    tripInfo: TripDetails
}

export const TripViewCard = ({
     tripInfo
}: TripViewCardProps) => {
    const navigate = useNavigate()
    
    const [actionMenuOpen, setActionMenuOpen] = useState(false)
    const [editTripDrawerOpen, setEditTripDrawerOpen] = useState(false)
    const [deleteTripModalOpen, setDeleteTripModalOpen] = useState(false)

    const handleOpenMenu = () => {
        setActionMenuOpen((opened) => !opened)
    }

    const handleCloseMenu = () => {
        if(!editTripDrawerOpen && !deleteTripModalOpen) setActionMenuOpen(false)
    }

    const datesDisplayText = useMemo(() => {
        const startDate = tripInfo.startDate
        const endDate = tripInfo.endDate

        if (startDate && endDate) {
            return `${prettifyDate(startDate)} - ${prettifyDate(endDate)}`
        }

        if (startDate) {
            return prettifyDate(startDate)
        }

        return undefined
    }, [tripInfo.startDate, tripInfo.endDate])

    const redirectToTripDetails = () => {
        navigate(`/trip?tripId=${tripInfo.tripId}`)
    }

    return (
        <>
            <OutsideAlerter onClickOutside={handleCloseMenu}>
                <Card className={classes.Card}>
                        <CardContent className={classes.Card__Content}>
                            <img
                                className={classes.Card__Image}
                                src={`src/assets/backgrounds/${tripInfo.imageRef}.jpg`}
                                loading="lazy"
                                alt="Trip Cover Image"
                            />
                            <Grid2 container className={classes.Card__InfoContainer}>
                                <Grid2 size={11} onClick={redirectToTripDetails}>
                                    <Tooltip
                                        title="Click to open this itinerary"
                                        placement='bottom'
                                        arrow={true}
                                    >
                                        <Typography variant="h5" component="div" className={classes.Card_Title}>
                                            {tripInfo.tripName}
                                        </Typography>
                                    </Tooltip>
                                </Grid2>
                                <Grid2 size={1}>
                                    <MoreVertOutlinedIcon
                                        className={classes.Card__Icon}
                                        onClick={() => {
                                            handleOpenMenu()
                                        }}
                                    />
                                </Grid2>
                                <Grid2 size={12}>
                                    {datesDisplayText && (
                                        <Typography variant="body2" color="text.secondary">
                                            {datesDisplayText}
                                        </Typography>
                                    )}
                                </Grid2>
                            </Grid2>
                        </CardContent>
                    {actionMenuOpen && (
                        <ActionPanel
                            editTripDrawerOpen={editTripDrawerOpen}
                            setEditTripDrawerOpen={setEditTripDrawerOpen}
                            deleteModalOpen={deleteTripModalOpen}
                            setDeleteModalOpen={setDeleteTripModalOpen}
                            tripDetails={tripInfo}
                            closeActionMenu={() => setActionMenuOpen(false)}
                        />
                    )}
                </Card>
            </OutsideAlerter>
        </>
    )
}