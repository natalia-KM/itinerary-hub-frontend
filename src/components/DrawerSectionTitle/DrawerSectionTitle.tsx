import { Typography } from '@mui/material'

interface DrawerSectionTitle {
    children: React.ReactNode
}

export const DrawerSectionTitle = ({
    children
}: DrawerSectionTitle) => {
    return (
        <Typography letterSpacing={-0.01} variant="subtitle1" fontSize={'1.1em'} fontWeight={500}>
            {children}
        </Typography>
    )
}