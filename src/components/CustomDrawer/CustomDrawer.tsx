import { Box, Drawer, Typography } from '@mui/material'
import { CustomDrawerProps } from './types'
import classes from './CustomDrawer.module.scss'

export const CustomDrawer = ({
    isOpen,
    setClosed,
    title,
    desc,
    children
}: CustomDrawerProps) => {
    return (
        <Drawer
            anchor='right'
            open={isOpen}
            onClose={setClosed}
            className={classes.Drawer}
        >
            <Box className={classes.Drawer__Container}>
                <Box className={classes.Drawer__IntroText}>
                    <Typography variant='h5'>
                        {title}
                    </Typography>
                    {desc && (
                        <Typography variant='subtitle1' className={classes.Drawer__Desc}>
                            {desc}
                        </Typography>
                    )}
                </Box>
                <Box className={classes.Drawer__Body}>{children}</Box>
            </Box>
        </Drawer>
    )
}