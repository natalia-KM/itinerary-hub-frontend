import { Card, CardContent, Grid, Tooltip, Typography } from '@mui/material'
import { getDatesText, TripDetails } from 'utils'
import OutsideAlerter from 'utils/OutsideAlerter'

import classes from './TripViewCard.module.scss'
import { useMemo, useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { ActionPanel } from './ActionPanel/ActionPanel'
import { useNavigate } from 'react-router'

interface TripViewCardProps {
    tripInfo: TripDetails
    index: number
}

export const TripViewCard = ({
    tripInfo,
    index
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
        return getDatesText(tripInfo.startDate, tripInfo.endDate)
    }, [tripInfo.startDate, tripInfo.endDate])

    const redirectToTripDetails = () => {
        navigate(`/trip?tripId=${tripInfo.tripId}`)
    }

    const testIdPrefix = `trip-view-card-${index}`

    return (
        <>
            <OutsideAlerter onClickOutside={handleCloseMenu}>
                <Card className={classes.Card} data-testid={testIdPrefix}>
                        <CardContent className={classes.Card__Content}>
                            <img
                                className={classes.Card__Image}
                                src={`/backgrounds/${tripInfo.imageRef}.jpg`}
                                loading="lazy"
                                alt="Trip Cover Image"
                                data-testid={`${testIdPrefix}-image`}
                            />
                            <Grid container className={classes.Card__InfoContainer} maxWidth={'300px'}>
                                <Grid size={11} onClick={redirectToTripDetails}>
                                    <Tooltip
                                        id={`${testIdPrefix}-tooltip`}
                                        title="Click to open this itinerary"
                                        data-testid={`${testIdPrefix}-tooltip`}
                                        placement='bottom'
                                        arrow={true}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            className={classes.Card_Title}
                                            data-testid={`${testIdPrefix}-trip-name`}
                                        >
                                            {tripInfo.tripName}
                                        </Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid size={1}>
                                    <MoreVertOutlinedIcon
                                        data-testid={`${testIdPrefix}-action-menu-button`}
                                        className={classes.Card__Icon}
                                        onClick={() => {
                                            handleOpenMenu()
                                        }}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    {datesDisplayText && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            data-testid={`${testIdPrefix}-dates`}
                                        >
                                            {datesDisplayText}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
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