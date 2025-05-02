import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classNames from 'classnames'
import classes from '../ElementCard/ElementCard.module.scss'
import { EditElementDrawer } from 'pages/TripDetails/EditElementDrawer'
import { useElementContext } from 'provider'

export const ElementMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [editElementOpen, setEditElementOpen] = useState(false)
    const open = Boolean(anchorEl)

    const { elementId } = useElementContext()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const testId = `${elementId}-element-menu`

    return (
        <>
            <IconButton
                data-testid={`${testId}-button`}
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
                    data-testid={'element-menu'}
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
                        data-testid={'edit-element-button'}
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