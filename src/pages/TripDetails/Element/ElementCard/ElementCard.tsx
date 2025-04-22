import { Box, Grid } from '@mui/material'
import React from 'react'
import { InformationColumnProps, PassengersColumnProps } from '../types'
import { InformationColumn } from '../InformationColumn'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classes from './ElementCard.module.scss'
import { ElementStatus } from 'hooks/elements'
import { ElementBadge } from '../ElementBadge'
import { PassengersColumn } from '../PassengersColumn'
import { statusStylesMap } from './elementStatusStyles'
import classNames from 'classnames'
import { elementCategoryIcons, IconConfig } from 'pages/TripDetails/AddElementDrawer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface ElementCardProps {
    children: React.ReactNode
    elementCategory: string
    passengerProps?: PassengersColumnProps
    elementStatus?: ElementStatus
    price?: string
    notes?: string
    additionalColumn?: InformationColumnProps
}

export const ElementCard = ({
    children,
    elementCategory,
    price,
    notes,
    elementStatus,
    passengerProps,
    additionalColumn
}: ElementCardProps) => {
    const { color, icon: Icon } = statusStylesMap[elementStatus ?? ElementStatus.PENDING]

    const defaultCategoryIcon: IconConfig = {
        icon: AutoAwesomeIcon,
        color: '#373A42',
        whiteIcon: true
    }

    const config = elementCategoryIcons[elementCategory] ?? defaultCategoryIcon
    const ElementCategoryIcon = config?.icon

    return (
        <Box className={classes.ElementCard}>
            <Box>
                <ElementBadge Icon={ElementCategoryIcon} tooltipText={elementCategory} color={config.color} whiteIcon={config.whiteIcon} />
                {elementStatus && (
                    <ElementBadge Icon={Icon} tooltipText={elementStatus.toString()} color={color} />
                )}
            </Box>
            <Box className={classNames(classes.ElementCard__Column, classes.ElementCard__ElementTyped)}>
                {children}
            </Box>
            <Box className={classNames(classes.ElementCard__Column, classes.ElementCard__ElementDetails)}>
                <Grid
                    container
                    columnGap={2}
                    rowGap={1}
                    width={'100%'}
                    marginLeft={'auto'}
                    flexWrap={'wrap'}
                >
                    {passengerProps && (
                        <Grid size={{ xs: 4, lg: 2.5 }} width={'auto'} maxWidth={'110px'}>
                            <PassengersColumn {...passengerProps}/>
                        </Grid>
                    )}
                    {price && (
                        <Grid size={{ xs: 4, lg: 2.5 }} width={'auto'} maxWidth={'110px'}>
                            <InformationColumn label='Price' value={price}/>
                        </Grid>
                    )}
                    {additionalColumn && (
                        <Grid size={{ xs: 4, lg: 2.5 }} width={'auto'} maxWidth={'110px'}>
                            <InformationColumn label={additionalColumn.label} value={additionalColumn.value}/>
                        </Grid>
                    )}
                    {notes && (
                        <Grid size={{ xs: notes.length > 50 ? 12 : 6, lg: notes.length > 50 ? 12 : 3 }}>
                            <InformationColumn label='Notes' value={notes} small={notes.length > 50}/>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Box className={classNames(classes.ElementCard__Column, classes.ElementCard__IconContainer)}>
                <MoreHorizIcon/>
            </Box>
        </Box>
    )
}