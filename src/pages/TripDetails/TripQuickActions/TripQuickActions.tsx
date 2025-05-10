import { SpeedDial, SpeedDialAction } from '@mui/material'
import classes from '../TripDetails.module.scss'
import React, { useState } from 'react'
import { AddSectionModal } from './AddSectionModal/AddSectionModal'
import { useTripStateContext } from 'provider/TripStateProvider/TripStateContext'
import { useTripId } from 'utils'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import EditIcon from '@mui/icons-material/Edit'
import { ManageSectionsModal } from './ManageSectionsModal/ManageSectionsModal'

export const TripQuickActions = () => {
    const [addSectionModalOpen, setAddSectionModalOpen] = useState(false)
    const [manageSectionsModalOpen, setManageSectionsModalOpen] = useState(false)
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
                icon={<SettingsIcon/>}
                data-testid={'trip-details-fab'}
            >
                <SpeedDialAction
                    data-testid={'add-section-button'}
                    onClick={() => setAddSectionModalOpen(true)}
                    icon={<AddIcon/>}
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
                    data-testid={'manage-sections-button'}
                    onClick={() => setManageSectionsModalOpen(true)}
                    icon={<EditIcon/>}
                    slotProps={{
                        tooltip: {
                            title: 'Manage Sections',
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
                    icon={<OpenInNewIcon/>}
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
            <ManageSectionsModal
                isOpen={manageSectionsModalOpen}
                actionButtonsProps={{
                    onConfirm: () => setManageSectionsModalOpen(false),
                    confirmTitle: 'Done',
                    showCancel: false
                }}
            />
        </>
    )
}