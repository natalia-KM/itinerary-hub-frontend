import { Box, Typography } from '@mui/material'
import classes from './ElementStyles.module.scss'

export const TimeLine = ({ testId, duration }: { testId?: string, duration?: string }) => {

    return (
        <Box className={classes.TimeLineContainer}>
            <Typography variant="body2" letterSpacing={'0.1em'} color={'textSecondary'} data-testid={testId}>
                {duration}
            </Typography>
            <div className={classes.TimeLineContainer__Dots}>
                {Array.from({ length: 11 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: i === 5 ? 6 : 4,
                            height: i === 5 ? 6 : 4,
                            borderRadius: '50%',
                            backgroundColor: i === 5 ? 'darkcyan' : 'lightgray',
                        }}
                    />
                ))}
            </div>
        </Box>
    )
}
