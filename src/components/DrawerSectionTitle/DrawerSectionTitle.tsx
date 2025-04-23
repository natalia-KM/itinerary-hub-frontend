import { Typography } from '@mui/material'

interface DrawerSectionTitle {
    children: React.ReactNode
    testId?: string
}

export const DrawerSectionTitle = ({
    children,
    testId
}: DrawerSectionTitle) => {
    return (
        <Typography letterSpacing={-0.01} variant="subtitle1" fontSize={'1.1em'} fontWeight={500} data-testid={testId}>
            {children}
        </Typography>
    )
}