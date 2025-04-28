import { Box, Divider, Drawer, IconButton, List, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useEffect, useState } from 'react'
import classes from './PassengerDrawer.module.scss'
import { useGetPassengers } from 'hooks/passengers/useGetPassengers/useGetPassengers'
import EditIcon from '@mui/icons-material/Edit'
import CancelledIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { AddPassengerForm } from './PassengerForm/AddPassengerForm'
import { Passenger } from './Passenger'

export const PassengerDrawer = () => {
    const { data: passengersList } = useGetPassengers()

    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [isAddingNew, setIsAddingNew] = useState(false)

    const [shouldCloseModifyForm, setCloseModifying] = useState(false)
    const [isAtTop, setIsAtTop] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const enableAdd = () => {
        setCloseModifying(true)
        setIsAddingNew(true)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        if (!editMode) setOpen(false)
    }

    return (
        <Drawer
            open={true}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
            variant="persistent"
            sx={{
                '& .MuiDrawer-paper': {
                    pt: isAtTop ? '84px' : '0px',
                    top: '0',
                    height: '100vh',
                    backgroundColor: '#353E46',
                    overflowX: 'hidden',
                    width: open ? 240 : 60,
                    transition: 'width 0.3s ease, padding-top 0.1s ease'
                }
            }}
        >
            <Box className={classes.Drawer}>
                {!open && (
                    <IconButton className={classes.IconButton}>
                        <Box
                            data-testid={'passengers-closed-bar'}
                            sx={{
                                margin: open ? '0 0 0 auto' : '0 auto'
                            }}
                        >
                            <MenuIcon sx={{ color: 'white' }}/>
                        </Box>
                    </IconButton>
                )}

                {open && (
                    <>
                        <Box
                            className={classes.DrawerHeader}
                            data-testid={'passengers-header'}
                        >
                            <Typography
                                className={classes.DrawerHeader__Title}
                                variant={'h6'}
                                gutterBottom
                            >
                                Passengers
                            </Typography>
                            <Tooltip title={editMode ? 'Disable Edit mode' : 'Enable Edit mode'}>
                                {editMode ? (
                                    <CancelledIcon
                                        data-testid={'passengers-close-edit-mode-icon'}
                                        className={classes.error}
                                        fontSize={'small'}
                                        onClick={() => {
                                            setEditMode(false)
                                            setCloseModifying(false)
                                            setIsAddingNew(false)
                                        }}
                                    />
                                ) : (
                                    <EditIcon
                                        data-testid={'passengers-edit-mode-icon'}
                                        fontSize={'small'}
                                        sx={{ color: 'white' }}
                                        onClick={() => setEditMode(true)}
                                    />
                                )}
                            </Tooltip>
                        </Box>
                        <Divider/>
                        {passengersList && (
                            <List dense>
                                {passengersList.map((passenger) => {
                                    return (
                                        <Passenger
                                            key={passenger.passengerId}
                                            passenger={passenger}
                                            editMode={editMode}
                                            closeAddingNew={() => {
                                                setIsAddingNew(false)
                                                setCloseModifying(false)
                                            }}
                                            closeModifying={shouldCloseModifyForm}
                                        />
                                    )
                                })}
                                {isAddingNew && (
                                    <AddPassengerForm cancelOp={() => {
                                        setCloseModifying(false)
                                        setIsAddingNew(false)
                                    }}/>
                                )}
                                {editMode && !isAddingNew && (
                                    <Box
                                        data-testid={'passengers-add-new-button'}
                                        className={classes.AddPassengerRowButton}
                                        onClick={enableAdd}
                                    >
                                        <AddCircleOutlineOutlinedIcon
                                            className={classes.AddPassengerRowButton__Component}
                                            fontSize={'small'}
                                            sx={{ color: 'white' }}
                                        />
                                        <Typography
                                            sx={{ color: 'white' }}
                                            fontSize={'13px'}
                                            className={classes.AddPassengerRowButton__Component}
                                        >
                                            Add Passenger
                                        </Typography>
                                    </Box>
                                )}
                            </List>
                        )}
                    </>
                )}
            </Box>
        </Drawer>
    )
}