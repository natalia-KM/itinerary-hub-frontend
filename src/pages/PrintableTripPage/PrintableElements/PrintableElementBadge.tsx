import { Box, Typography } from '@mui/material'
import classes from './PrintableElementCard.module.scss'

interface PrintableElementBadgeProps {
    badgeText: string
    color: string,
    whiteText?: boolean
    testId?: string
}

export const PrintableElementBadge = ({
    color,
    badgeText,
    whiteText = false,
    testId
}: PrintableElementBadgeProps) => {

    return (
            <Box
                sx={{ backgroundColor: color, color: whiteText ? 'white' : 'inherit', fontSize: '14px', opacity:'80%' }}
                className={classes.PrintableElementBadge}
                data-testid={testId}
            >
                <Typography fontSize={'small'} textAlign={'center'}>
                    {badgeText}
                </Typography>
            </Box>
    )
}