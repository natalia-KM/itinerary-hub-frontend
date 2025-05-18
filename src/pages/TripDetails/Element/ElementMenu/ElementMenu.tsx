import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classNames from 'classnames'
import classes from '../ElementCard/ElementCard.module.scss'
import { EditElementDrawer } from 'pages/TripDetails/EditElementDrawer'
import { useElementContext } from 'provider'
import { DeleteElementModal } from '../DeleteElementModal'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { CopyLinkModal } from '../CopyLinkModal'
import { MoveElementModal } from '../MoveElementModal/MoveElementModal'

export const ElementMenu = ({ link }: { link?: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [copyLinkModalOpen, setCopyLinkModalOpen] = useState(false)
    const [moveElementOpen, setMoveElementOpen] = useState(false)
    const [editElementOpen, setEditElementOpen] = useState(false)
    const [deleteElementOpen, setDeleteElementOpen] = useState(false)

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
                    {link && (
                            <MenuItem
                                data-testid={'copy-link-button'}
                                onClick={() => {
                                    setCopyLinkModalOpen(true)
                                    handleClose()
                                }}
                            >
                                <ListItemIcon>
                                    <ContentCopyIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    Copy Link
                                </ListItemText>
                            </MenuItem>
                    )}
                    <MenuItem
                        data-testid={'move-element-button'}
                        onClick={() => {
                            setMoveElementOpen(true)
                            handleClose()
                        }}
                    >
                        <ListItemIcon>
                            <OpenWithIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Move
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
                            Edit
                        </ListItemText>
                    </MenuItem>
                    <MenuItem
                        data-testid={'delete-element-button'}
                        onClick={() => {
                            setDeleteElementOpen(true)
                            handleClose()
                        }}
                    >
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Delete
                        </ListItemText>
                    </MenuItem>
                </Menu>
            )}
            {link && (
                <CopyLinkModal
                    modalOpen={copyLinkModalOpen}
                    setModalOpen={setCopyLinkModalOpen}
                    link={link}
                />
            )}
            {moveElementOpen && (
                <MoveElementModal
                    modalOpen={moveElementOpen}
                    setModalOpen={() => setMoveElementOpen(false)}
                />
            )}
            {editElementOpen && (
                <EditElementDrawer
                    isOpen={editElementOpen}
                    handleClose={() => setEditElementOpen(false)}
                />
            )}
            <DeleteElementModal modalOpen={deleteElementOpen} setModalOpen={setDeleteElementOpen}/>
        </>
    )
}