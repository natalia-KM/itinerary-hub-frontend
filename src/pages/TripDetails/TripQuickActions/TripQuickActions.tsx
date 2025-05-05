import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import classes from '../TripDetails.module.scss'
import React, { useState } from 'react'
import { AddSectionModal } from './AddSectionModal/AddSectionModal'
import { useTripStateContext } from 'provider/TripStateProvider/TripStateContext'
import { useTripId } from 'utils'

export const TripQuickActions = () => {
    const [addSectionModalOpen, setAddSectionModalOpen] = useState(false)
    const { tripId } = useTripId()
    const { selectedOptions } = useTripStateContext()

    const handleDownloadPDF = () => {
        sessionStorage.setItem('selectedOptions', JSON.stringify(selectedOptions))

        window.open(`/trip/print?tripId=${tripId}`, '_blank')
    }

    return (
        <>
            <SpeedDial
                className={classes.TripDetails__Fab}
                ariaLabel={'SpeedDial for trip actions'}
                icon={<SpeedDialIcon/>}
                data-testid={'trip-details-fab'}
            >
                <SpeedDialAction
                    data-testid={'add-section-button'}
                    onClick={() => setAddSectionModalOpen(true)}
                    icon={<SpeedDialIcon/>}
                    slotProps={{
                        tooltip: {
                            title: 'Add Section',
                            open: true
                        },
                        staticTooltipLabel: {
                            sx: { maxWidth: 'none', width: 'max-content' }
                        }
                    }}
                />
                <SpeedDialAction
                    data-testid={'download-itinerary-button'}
                    onClick={handleDownloadPDF}
                    icon={<SpeedDialIcon/>}
                    slotProps={{
                        tooltip: {
                            title: 'Download Itinerary',
                            open: true
                        },
                        staticTooltipLabel: {
                            sx: { maxWidth: 'none', width: 'max-content' }
                        }
                    }}
                />
            </SpeedDial>
            <AddSectionModal
                modalOpen={addSectionModalOpen}
                setModalOpen={setAddSectionModalOpen}
            />
        </>
    )
}