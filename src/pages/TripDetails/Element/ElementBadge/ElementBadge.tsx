import { Box, Tooltip } from '@mui/material'
import classes from './ElementBadge.module.scss'

interface ElementBadgeProps {
    Icon: React.ElementType
    tooltipText: string
    color: string,
    whiteIcon?: boolean
    testId?: string
}

export const ElementBadge = ({
    Icon,
    color,
    tooltipText,
    whiteIcon = false,
    testId
}: ElementBadgeProps) => {

    return (
        <Tooltip title={tooltipText} placement={'right'} id={`${testId}-tooltip`}>
            <Box sx={{ backgroundColor: color }} className={classes.ElementBadge}>
                <Icon sx={{ color: whiteIcon ? 'white' : 'inherit' }} data-testid={`${testId}-icon`} />
            </Box>
        </Tooltip>
    )
}