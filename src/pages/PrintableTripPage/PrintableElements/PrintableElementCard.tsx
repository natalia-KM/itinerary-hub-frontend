import React from 'react'
import { InformationColumnProps } from 'pages/TripDetails/Element/types'
import { ElementStatus, PassengerDetails } from 'hooks/elements'
import { Box, Divider, Link, List, ListItem, ListItemText, Typography } from '@mui/material'
import classes from './PrintableElementCard.module.scss'
import classNames from 'classnames'
import { statusStylesMap } from 'pages/TripDetails/Element/ElementCard/elementStatusStyles'
import { elementCategoryIcons, IconConfig } from 'pages/TripDetails/ElementDrawer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { PrintableElementBadge } from './PrintableElementBadge'
import { UserAvatar } from 'components/UserAvatar'

interface PrintableElementCard {
    children: React.ReactNode
    elementCategory: string
    passengersList?: PassengerDetails[]
    elementStatus?: ElementStatus
    price?: string
    notes?: string
    link?: string
    additionalColumn?: InformationColumnProps
}

export const PrintableElementCard = ({
    children,
    elementCategory,
    price,
    notes,
    link,
    elementStatus,
    passengersList,
    additionalColumn
}: PrintableElementCard) => {
    const { color } = statusStylesMap[elementStatus ?? ElementStatus.PENDING]

    const defaultCategoryIcon: IconConfig = {
        icon: AutoAwesomeIcon,
        color: '#373A42',
        whiteIcon: true
    }
    const config = elementCategoryIcons[elementCategory] ?? defaultCategoryIcon

    return (
        <Box className={classes.ElementCard}>
            <div className={classes.InformationColumn}>
                <Box className={classes.BadgesRow}>
                    <PrintableElementBadge
                        badgeText={elementCategory}
                        color={config.color}
                        whiteText={config.whiteIcon}
                    />
                    {elementStatus && (
                        <PrintableElementBadge
                            badgeText={elementStatus.toString()}
                            color={color}
                            whiteText={config.whiteIcon}
                        />
                    )}
                </Box>
                <Box className={classes.TopRow}>
                    <Box className={classNames(classes.ElementCard__ElementTyped)}>
                        {children}
                    </Box>
                </Box>
                {(additionalColumn || price) && (
                    <Box className={classNames(classes.Row, classes.ExtraPadding)}>
                        {price && (
                            <div>
                                <Typography fontSize={'small'}>
                                    {price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} fontSize="11px"
                                            letterSpacing={'0.05em'}>
                                    {'PRICE'}
                                </Typography>
                            </div>
                        )}
                        {additionalColumn && (
                            <div>
                                <Typography fontSize={'small'}>
                                    {additionalColumn.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} fontSize="11px"
                                            letterSpacing={'0.05em'}>
                                    {additionalColumn.label.toUpperCase()}
                                </Typography>
                            </div>
                        )}
                    </Box>
                )}
                {link && (
                    <Box className={classNames(classes.Row)}>
                        <div>
                            <Link href="#" fontSize={'small'} sx={{ cursor: 'text' }}>{link}</Link>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} fontSize="11px"
                                        letterSpacing={'0.05em'}>
                                {'LINK'}
                            </Typography>
                        </div>
                    </Box>
                )}
                {notes && (
                    <Box className={classNames(classes.Row)}>
                        <div>
                            <Typography fontSize={'small'}>
                                {notes}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} fontSize="11px"
                                        letterSpacing={'0.05em'}>
                                {'NOTES'}
                            </Typography>
                        </div>
                    </Box>
                )}
            </div>
            {passengersList && passengersList.length > 0 && (
                <>
                    <Divider orientation="vertical" flexItem/>
                    <Box className={classNames(classes.Column)}>
                        <List sx={{ padding: 0 }} dense>
                            {passengersList.map((passenger) => {
                                return (
                                    <ListItem sx={{ padding: 0, gap: '6px' }}>
                                        <UserAvatar
                                            firstName={passenger.firstName}
                                            lastName={passenger.lastName}
                                            small={true}
                                        />
                                        <ListItemText
                                            slotProps={{
                                                primary: {
                                                    fontSize: 'small',
                                                    color: '#373A42',
                                                    letterSpacing: '0.05em'
                                                }
                                            }}
                                        >
                                            {passenger.firstName} {passenger.lastName}
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </>
            )}
        </Box>
    )
}