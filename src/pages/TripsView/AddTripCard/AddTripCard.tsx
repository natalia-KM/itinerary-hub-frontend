import { Card, Typography } from '@mui/material'
import { CiCirclePlus } from 'react-icons/ci'
import classes from './AddTripCard.module.scss'
import { useState } from 'react'
import { CreateTripDrawer } from 'pages/TripsView/CreateTripModal/CreateTripDrawer'

export const AddTripCard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const openDrawer = () => {
        setDrawerOpen(true)
    }

    const closeDrawer = () => {
        setDrawerOpen(false)
    }

    return (
        <>
            <Card className={classes.Card} onClick={openDrawer}>
                <CiCirclePlus className={classes.Card__Icon}/>
                <Typography variant="h6" component="div" fontWeight={400}>
                    Add new trip
                </Typography>
            </Card>
            <CreateTripDrawer
                isOpen={drawerOpen}
                setClosed={closeDrawer}
            />
        </>
    )
}