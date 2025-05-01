import { useEffect, useState } from 'react'
import { Button, Paper, Typography } from '@mui/material'
import classes from './CookieBanner.module.scss'

export const CookieBanner = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consentGiven = localStorage.getItem('cookies')
        if (!consentGiven) {
            setVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookies', 'true')
        setVisible(false)
    }

    if (!visible) {
        return null
    }

    return (
        <Paper
            className={classes.CookieBanner}
            elevation={3}
        >
            <Typography variant="body2">
                We use only essential cookies to ensure the website functions correctly.
                By continuing to use this site, you agree to our use of necessary cookies.
            </Typography>
            <Button variant="contained" onClick={handleAccept} data-testid={'cookie-banner-btn'}>
                OK
            </Button>
        </Paper>
    )
}
