import { Box, Tooltip, Typography } from '@mui/material'
import { InformationColumnProps } from '../types'

export const InformationColumn = ({
    label,
    value,
    small = false
}: InformationColumnProps) => {
    return (
        <div>
            {typeof value === 'string' ? (
                <Tooltip title={value}>
                <Typography
                    fontSize={small ? 'small' : 'medium'}
                    sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        textOverflow: 'ellipsis'
                    }}
                >
                    {value}
                </Typography>
                </Tooltip>
            ) : (
                <Box>
                    {value}
                </Box>
            )}
            <Typography variant="body2" sx={{ color: 'text.secondary' }} fontSize='11px' letterSpacing={'0.05em'}>
                {label.toUpperCase()}
            </Typography>
        </div>
    )
}