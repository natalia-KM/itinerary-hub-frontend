import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import classes from '../TripDetails.module.scss'
import React, { useState } from 'react'
import { AddSectionModal } from './AddSectionModal/AddSectionModal'

export const TripQuickActions = () => {
    const [addSectionModalOpen, setAddSectionModalOpen] = useState(false)

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
            </SpeedDial>
            <AddSectionModal
                modalOpen={addSectionModalOpen}
                setModalOpen={setAddSectionModalOpen}
            />
        </>
    )
}