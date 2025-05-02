import { Box, Grid } from '@mui/material'
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

interface ElementCardProps {
    children: React.ReactNode
    elementId: string
    elementCategory: string
    passengerProps?: PassengersColumnProps
    elementStatus?: ElementStatus
    price?: string
    notes?: string
    additionalColumn?: InformationColumnProps
}

export const ElementCard = ({
    children,
    elementId,
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
    const testOptionId = elementCategory?.replace('& ', '').replace(' ', '-').toLowerCase()

    return (
        <Box className={classes.ElementCard} data-testid={`element-${elementId}`}>
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
            <ElementMenu/>
        </Box>
    )
}