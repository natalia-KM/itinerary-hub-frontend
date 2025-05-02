import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classNames from 'classnames'
import classes from '../ElementCard/ElementCard.module.scss'
import { EditElementDrawer } from 'pages/TripDetails/EditElementDrawer'

export const ElementMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [editElementOpen, setEditElementOpen] = useState(false)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton
                onClick={handleClick}
                className={classNames(
                    classes.ElementCard__IconContainer
                )}
            >
                <MoreHorizIcon/>
            </IconButton>
            {open && (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <AddIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Add Element Below
                        </ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setEditElementOpen(true)
                            handleClose()
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Edit Element
                        </ListItemText>
                    </MenuItem>
                </Menu>
            )}
            {editElementOpen && (
                <EditElementDrawer
                    isOpen={editElementOpen}
                    handleClose={() => setEditElementOpen(false)}
                />
            )}
        </>
    )
}