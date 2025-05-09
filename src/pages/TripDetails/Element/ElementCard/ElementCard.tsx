import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { InformationColumnProps, PassengersColumnProps } from '../types'
import { InformationColumn } from '../InformationColumn'
import classes from './ElementCard.module.scss'
import { ElementStatus } from 'hooks/elements'
import { ElementBadge } from '../ElementBadge'
import { PassengersColumn } from '../PassengersColumn'
import { statusStylesMap } from './elementStatusStyles'
import classNames from 'classnames'
import { elementCategoryIcons, IconConfig } from 'pages/TripDetails/ElementDrawer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { ElementMenu } from '../ElementMenu/ElementMenu'
import { prettifyDateWithTime } from 'utils'

interface ElementCardProps {
    children: React.ReactNode
    elementId: string
    elementCategory: string
    passengerProps?: PassengersColumnProps
    elementStatus?: ElementStatus
    lastUpdated: string
    price?: string
    notes?: string
    link?: string
    additionalColumn?: InformationColumnProps
}

export const ElementCard = ({
    children,
    elementId,
    elementCategory,
    lastUpdated,
    price,
    notes,
    link,
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
    const testOptionId = elementCategory?.replace('& ', '').replace(' ', '-').toLowerCase()

    return (
        <Box className={classes.ElementCard} data-testid={`element-${elementId}`}>
            <div className={classes.ElementCard__MainBody}>
            <Box>
                <ElementBadge Icon={ElementCategoryIcon} tooltipText={elementCategory} color={config.color} whiteIcon={config.whiteIcon} testId={`${testOptionId}-category-badge`} />
                {elementStatus && (
                    <ElementBadge Icon={Icon} tooltipText={elementStatus.toString()} color={color} testId={'element-status-badge'} />
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
                            <InformationColumn label='Price' value={price} testId={`${elementId}-price`} />
                        </Grid>
                    )}
                    {additionalColumn && (
                        <Grid size={{ xs: 4, lg: 2.5 }} width={'auto'} maxWidth={'110px'}>
                            <InformationColumn label={additionalColumn.label} value={additionalColumn.value} testId={`${elementId}-custom`}/>
                        </Grid>
                    )}
                    {notes && (
                        <Grid size={{ xs: notes.length > 50 ? 12 : 6, lg: notes.length > 50 ? 12 : 3 }}>
                            <InformationColumn label='Notes' value={notes} small={notes.length > 50} testId={`${elementId}-notes`}/>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <ElementMenu link={link}/>
            </div>
            <Typography variant="body2" className={classes.ElementCard__LastUpdatedAtText}>
                Last updated at: {prettifyDateWithTime(new Date(lastUpdated))}
            </Typography>
        </Box>
    )
}