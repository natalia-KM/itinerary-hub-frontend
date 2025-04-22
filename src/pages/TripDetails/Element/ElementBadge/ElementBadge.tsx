import { Box, Tooltip } from '@mui/material'
import classes from './ElementBadge.module.scss'

interface ElementBadgeProps {
    Icon: React.ElementType
    tooltipText: string
    color: string,
    whiteIcon?: boolean
}

export const ElementBadge = ({
    Icon,
    color,
    tooltipText,
    whiteIcon = false
}: ElementBadgeProps) => {


    return (
        <Tooltip title={tooltipText} placement={'right'}>
            <Box sx={{ backgroundColor: color }} className={classes.ElementBadge}>
                <Icon sx={{ color: whiteIcon ? 'white' : 'inherit' }} />
            </Box>
        </Tooltip>
    )
}